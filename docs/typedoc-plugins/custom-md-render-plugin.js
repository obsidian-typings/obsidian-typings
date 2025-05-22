import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

export function load(app) {
    const convertHeadings = ['Todo', 'Tutorial', 'Remark', 'Deprecated', 'Unofficial', 'Official'];
    const regexes = convertHeadings.map(heading => {
        return {
            type: heading.toLowerCase(),
            regex: [
                new RegExp(`#{1,6} ${heading}\n([\\s\\S]*?)(?=^##|\\z|:::)`, 'gm'),
                new RegExp(`#{1,6} ${heading}\n([\\s\\S]*)(?=:::)`, 'gm')
            ]
        };
    });

    app.renderer.on(MarkdownPageEvent.END, (page) => {
        for (const heading of regexes) {
            for (const regexp of heading.regex) {
                page.contents = page.contents.replace(regexp, `:::${heading.type}{.${heading.type}}$1:::\n`);
            }
        }
    });
}
