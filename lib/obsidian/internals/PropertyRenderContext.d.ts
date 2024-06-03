import { MetadataEditor } from "./MetadataEditor.d.ts";

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
     */
    onChange: () => void;
    /**
     * Determine the source path of current context
     */
    sourcePath: string;
}
