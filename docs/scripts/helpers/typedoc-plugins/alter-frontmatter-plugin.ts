import type {
  Application,
  DeclarationReflection
} from 'typedoc';
import type { MarkdownRenderer } from 'typedoc-plugin-markdown';

import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

const NAMESPACE_DISPLAY_NAMES: Record<string, string> = {
  canvas: 'Obsidian Canvas',
  codemirror__language: '@codemirror/language',
  codemirror__state: '@codemirror/state',
  codemirror__view: '@codemirror/view',
  electron: 'Electron',
  globals: 'Obsidian Globals',
  internals: 'Obsidian Internals',
  obsidian: 'Obsidian',
  publish: 'Obsidian Publish'
};

export function load(app: Application): void {
  const renderer = app.renderer as MarkdownRenderer;
  renderer.on(
    MarkdownPageEvent.BEGIN,
    (page: MarkdownPageEvent) => {
      if (page.filename.endsWith('README.md')) {
        page.frontmatter = {
          ...page.frontmatter,
          draft: true,
          pagefind: false
        };
      }

      const model = page.model as DeclarationReflection;
      if (model.comment?.blockTags.some((tag) => tag.tag === '@todo')) {
        page.frontmatter = {
          sidebar: {
            badge: {
              text: 'TODO',
              variant: 'caution'
            }
          },
          ...page.frontmatter
        };
      }

      const sidebarLabel = getNamespaceDisplayName(page.url);
      if (sidebarLabel) {
        page.frontmatter = {
          ...page.frontmatter,
          sidebar: {
            ...page.frontmatter['sidebar'] as Record<string, unknown> | undefined,
            label: sidebarLabel
          }
        };
      }

      page.frontmatter = {
        ...page.frontmatter,
        editUrl: false
      };
    }
  );
}

function getNamespaceDisplayName(url: string): string | undefined {
  const match = url.match(/namespaces\/([^/]+)\/readme/);
  if (match) {
    return NAMESPACE_DISPLAY_NAMES[match[1]];
  }
  return undefined;
}
