import type { App } from 'obsidian';
import type { MetadataEditor } from './MetadataEditor.js';

/** @public */
export interface PropertyRenderContext {
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Callback called on property field unfocus
     */
    blur: () => void;
    /**
     * Key of the property field
     */
    key: string;
    /**
     * Reference to the metadata editor
     */
    metadataEditor: MetadataEditor;
    /**
     * Determine the source path of current context
     */
    sourcePath: string;

    /**
     * Callback called on property value change
     */
    onChange(value: unknown): void;
}
