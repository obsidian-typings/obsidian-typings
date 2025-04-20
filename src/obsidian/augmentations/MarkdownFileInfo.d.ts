import type { MetadataEditor } from '../internals/MetadataEditor.d.ts';

declare module 'obsidian' {
    interface MarkdownFileInfo extends HoverParent {
        /**
         * @unofficial
         */
        metadataEditor?: MetadataEditor;
    }
}
