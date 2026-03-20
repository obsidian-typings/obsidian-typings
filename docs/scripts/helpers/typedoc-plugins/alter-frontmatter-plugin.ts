import type {
  Application,
  DeclarationReflection
} from 'typedoc';
import type { MarkdownRenderer } from 'typedoc-plugin-markdown';

import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

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

      page.frontmatter = {
        ...page.frontmatter,
        editUrl: false
      };
    }
  );
}
