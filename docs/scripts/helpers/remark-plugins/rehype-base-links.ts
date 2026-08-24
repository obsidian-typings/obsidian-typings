import type {
  Element,
  Root
} from 'hast';

import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that prepends the Astro base URL to absolute content links.
 * This ensures links like `/getting-started/` become `/obsidian-typings/public/getting-started/`
 * when deployed under a sub-path.
 */
export function rehypeBaseLinks(base: string): (tree: Root) => void {
  const normalizedBase = base.replace(/\/$/, '');
  return function rehypeBaseLinksVisitor(tree: Root): void {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') {
        return;
      }
      const href = node.properties.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith(normalizedBase)) {
        node.properties.href = normalizedBase + href;
      }
    });
  };
}
