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
     * Callback called on property value change
     * @remark This will not always run when it's value changes. e.g. Clicking the "x" button to delete a multi-text item
     */
    onChange: (value: unknown) => void;
    /**
     * Determine the source path of current context
     */
    sourcePath: string;
}
