import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import type { MarkdownScrollableEditView } from './MarkdownScrollableEditView.d.ts';

/** @public @unofficial */
export interface IFramedMarkdownEditor extends MarkdownScrollableEditView {
    /**
     * Function that cleans up the iframe and listeners
     */
    cleanup: null | (() => void);
    /**
     * Element where the editor is embedded into
     */
    iframeEl: null | HTMLIFrameElement;

    /**
     * Executes cleanup function if exists
     */
    cleanupIframe(): void;
    /**
     * Constructs extensions for the editor based on user settings
     *
     * @remark Creates extension for overriding escape keymap to showPreview
     */
    getDynamicExtensions(): Extension[];
    /**
     * Loads the iframe element and prepare cleanup function
     */
    onIframeLoad(): void;
    /**
     * Execute cleanup of the iframe
     */
    onunload(): void;
    /**
     * Execute functionality on CM editor state update
     */
    onUpdate(update: ViewUpdate, changed: boolean): void;
}
