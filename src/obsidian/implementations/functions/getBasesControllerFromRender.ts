import type {
  App,
  Component
} from 'obsidian';

import { MarkdownRenderer } from 'obsidian';

import type { BasesController } from '../../internals/internal-plugins/bases/BasesController.d.ts';

/**
 * Render a base into a detached, off-screen element and return the live {@link BasesController} that drives
 * it. This is the leaf-free route to headless base evaluation: it runs Obsidian's own base-embed processor
 * via the public {@link obsidian#MarkdownRenderer.render}, then locates the controller in the render's
 * component tree.
 *
 * The caller owns `component`'s lifecycle and MUST call `component.unload()` once done with the controller
 * (which also detaches the rendered element).
 *
 * @param app - The app instance.
 * @param content - The `.base` file content (the body of a `base` code block).
 * @param sourcePath - The path supplying the query's file context.
 * @param component - The component that owns the render; the caller unloads it.
 * @returns The live {@link BasesController} for the rendered base.
 *
 * @public
 * @unofficial
 */
export async function getBasesControllerFromRender(
  app: App,
  content: string,
  sourcePath: string,
  component: Component
): Promise<BasesController> {
  // The `_children` walk plus the controller's `query` / `results` are runtime internals not modeled on
  // Component, so they are typed locally purely to breadth-first search the render tree.
  interface ComponentTreeNode {
    /** The child components, if any. */
    _children?: ComponentTreeNode[];

    /** The current query, present on a controller. */
    query?: unknown;

    /** The query results, present as a `Map` on a controller. */
    results?: unknown;
  }

  // The element must be attached to the document (not merely detached) for the base's initial scan to run,
  // so it is positioned off-screen rather than hidden. It is removed when the caller unloads `component`.
  const containerEl = createDiv();
  containerEl.style.position = 'absolute';
  containerEl.style.left = '-9999px';
  containerEl.style.width = '600px';
  document.body.appendChild(containerEl);
  component.register(() => {
    containerEl.remove();
  });

  await MarkdownRenderer.render(app, `\`\`\`base\n${content}\n\`\`\`\n`, containerEl, sourcePath, component);

  const queue: ComponentTreeNode[] = [component as unknown as ComponentTreeNode];
  const seen = new Set<ComponentTreeNode>();

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node || seen.has(node)) {
      continue;
    }
    seen.add(node);

    if (node.results instanceof Map && 'query' in node) {
      return node as unknown as BasesController;
    }

    for (const child of node._children ?? []) {
      queue.push(child);
    }
  }

  throw new Error('Could not locate the BasesController in the rendered component tree.');
}
