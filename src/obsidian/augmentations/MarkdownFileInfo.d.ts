import type { MetadataEditor } from '../internals/MetadataEditor.d.ts';

declare module 'obsidian' {
    interface MarkdownFileInfo extends HoverParent {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        metadataEditor?: MetadataEditor;
    }
}
