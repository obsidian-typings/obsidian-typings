import type { Root } from 'mdast';
import type { VFile } from 'vfile';

import { posix } from 'node:path';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin that converts absolute internal links to relative links.
 *
 * TypeDoc (via starlight-typedoc) generates markdown files with absolute links
 * that embed the Astro config's `base` path (e.g., `/obsidian-typings/api/...`).
 * When the base path is overridden at build time (e.g., `--base /obsidian-typings/public`),
 * these links break because they still reference the config-time base.
 *
 * This plugin strips the known base prefix, computes a relative path from the
 * current file to the target, and rewrites the link. Relative links are also
 * skipped by `starlight-links-validator` (`errorOnRelativeLinks: false`).
 */
export function remarkRelativeLinks(base: string): () => (tree: Root, file: VFile) => void {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return function plugin(): (tree: Root, file: VFile) => void {
    return function transformer(tree: Root, file: VFile): void {
      const filePath = file.history[0];
      if (!filePath) {
        return;
      }

      const currentSlug = getContentSlug(filePath);
      if (!currentSlug) {
        return;
      }

      visit(tree, 'link', (node) => {
        if (!node.url.startsWith(normalizedBase)) {
          return;
        }

        const stripped = node.url.slice(normalizedBase.length);
        const [pathPart = '', ...anchorParts] = stripped.split('#');
        const anchor = anchorParts.length > 0 ? `#${anchorParts.join('#')}` : '';

        const targetSlug = pathPart.replace(/\/$/, '');
        // Use the slug itself as the "directory" — each page gets its own URL directory
        // e.g., slug "api/.../getsuggestions" → URL "/api/.../getsuggestions/"
        let relativePath = posix.relative(currentSlug, targetSlug);
        if (!relativePath.startsWith('.')) {
          relativePath = `./${relativePath}`;
        }

        node.url = `${relativePath}/${anchor}`;
      });
    };
  };
}

/**
 * Extracts the content-relative path from an absolute file path, preserving case.
 *
 * Given `.../content/docs/api/.../interfaces/Foo.md`, returns `api/.../interfaces/Foo`.
 */
function getContentSlug(filePath: string): null | string {
  const normalized = filePath.replaceAll('\\', '/');
  const marker = 'content/docs/';
  const markerIndex = normalized.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }

  const relative = normalized.slice(markerIndex + marker.length);
  const withoutExt = relative.replace(/\.\w+$/, '');
  return withoutExt;
}
