import type { App } from 'obsidian';
import type { MetadataEditor } from './MetadataEditor.d.ts';

/**
 * Context provided to property widgets for rendering and interaction.
 * @public
 * @unofficial
 */
export interface PropertyRenderContext {
    /**
     * Reference to the app.
     */
    app: App;

    /**
     * Callback called on property field unfocus.
     */
    blur(): void;

    /**
     * Key of the property field.
     */
    key: string;

    /**
     * Callback called on property value change.
     *
     * @param value - The new property value.
     */
    onChange(value: unknown): void;

    /**
     * Determine the source path of current context.
     */
    sourcePath: string;
}
