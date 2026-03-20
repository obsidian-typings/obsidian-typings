import type { Element } from 'hast';

/**
 * Recursively walk a hast tree and decorate each node with the metadata
 * required for remark-directive.
 */
export function decorateHast(node: Element): void {
  Object.assign(node.data ?? (node.data = { position: {} }), {
    hName: node.tagName,
    hProperties: node.properties
  });

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      if ('tagName' in child) {
        decorateHast(child);
      }
    }
  }
}
