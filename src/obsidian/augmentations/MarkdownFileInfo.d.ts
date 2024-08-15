import type { MetadataEditor } from "../internals/MetadataEditor.js";

declare module "obsidian" {
    interface MarkdownFileInfo extends HoverParent {
        metadataEditor?: MetadataEditor;
    }
}
