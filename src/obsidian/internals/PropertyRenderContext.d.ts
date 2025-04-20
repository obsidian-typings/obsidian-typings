import type { App } from 'obsidian';
import type { MetadataEditor } from './MetadataEditor.d.ts';

/**
 * @public
 * @unofficial
 */
export interface PropertyRenderContext {
    /**
     * Reference to the app.
     */
    app: App;
    /**
     * Key of the property field.
     */
    key: string;
    /**
     * Reference to the metadata editor.
     */
    metadataEditor: MetadataEditor;
    /**
     * Determine the source path of current context.
     */
    sourcePath: string;

    /**
     * Callback called on property field unfocus.
     */
    blur(): void;
    /**
     * Callback called on property value change.
     */
    onChange(value: unknown): void;
}
