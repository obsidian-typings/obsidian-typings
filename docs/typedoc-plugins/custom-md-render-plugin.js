import { MarkdownPageEvent } from "typedoc-plugin-markdown";

export function load(app) {
    // Convert :::caution[Deprecated]
    // Will be inaccessible in a future version, prefer using `Platform.isMobile`
    // :::
    // to ### Deprecated {contents}


    const convertHeadings = ["Todo", "Tutorial", "Remark", "Deprecated"]

    app.renderer.on(MarkdownPageEvent.END, (page) => {
        page.contents = page.contents.replace(/:::caution\[(.*)\]\n([\s\S]*?):::/g, "### $1\n\n$2\n");

        for (const heading of convertHeadings) {
            const type = heading.toLowerCase();
            page.contents = page.contents.replace(new RegExp(`#{1,6} ${heading}\n([\\s\\S]*?)(?=^##|\\z)`, "gm"), `:::${type}{.${type}}$1:::\n`);
            page.contents = page.contents.replace(new RegExp(`#{1,6} ${heading}\n([\\s\\S]*)`, "gm"), `:::${type}{.${type}}$1:::\n`);
        }
    });
}
