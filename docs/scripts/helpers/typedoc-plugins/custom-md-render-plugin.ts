import type { Application } from 'typedoc';
import type { MarkdownRenderer } from 'typedoc-plugin-markdown';

import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

interface HeadingRegex {
  regex: RegExp[];
  type: string;
}

const CONVERT_HEADINGS = ['Todo', 'Tutorial', 'Remark', 'Deprecated', 'Unofficial', 'Official'];

export function load(app: Application): void {
  const regexes: HeadingRegex[] = CONVERT_HEADINGS.map((heading) => ({
    regex: [
      new RegExp(`#{1,6} ${heading}\n([\\s\\S]*?)(?=^##|\\z|:::)`, 'gm'),
      new RegExp(`#{1,6} ${heading}\n([\\s\\S]*)(?=:::)`, 'gm')
    ],
    type: heading.toLowerCase()
  }));

  const renderer = app.renderer as MarkdownRenderer;
  renderer.on(MarkdownPageEvent.END, (page: MarkdownPageEvent) => {
    for (const heading of regexes) {
      for (const regexp of heading.regex) {
        page.contents = page.contents.replace(regexp, `:::${heading.type}{.${heading.type}}$1:::\n`);
      }
    }
  });
}
