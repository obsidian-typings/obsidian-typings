import type {
    App,
    Component
} from 'obsidian';
import type { MetadataEditor } from './MetadataEditor.d.ts';
import type { MetadataEditorPropertyTypeInfo } from './MetadataEditorPropertyTypeInfo.d.ts';
import type { MetadataWidget } from './MetadataWidget.d.ts';
import type { PropertyEntryData } from './PropertyEntryData.d.ts';

/**
 * @public
 * @unofficial
 */
export interface MetadataEditorProperty extends Component {
    /**
     * Reference to the app.
     */
    app: App;

    /**
     * Container element for the metadata editor property.
     */
    containerEl: HTMLElement;

    /**
     * Entry information for the property.
     */
    entry: PropertyEntryData<unknown>;

    /**
     * Icon element of the property.
     */
    iconEl: HTMLSpanElement;

    /**
     * Key value of the property.
     */
    keyEl: HTMLElement;

    /**
     * Input field for key value of the property.
     */
    keyInputEl: HTMLInputElement;

    /**
     * Metadata editor the property is attached to.
     */
    metadataEditor: MetadataEditor;

    /**
     * Widget that handles user input for this property widget type.
     */
    rendered: MetadataWidget | null;

    /**
     * Info about the inferred and expected property widget given key-value pair.
     */
    typeInfo: MetadataEditorPropertyTypeInfo;

    /**
     * Element that contains the value input or widget.
     */
    valueEl: HTMLElement;

    /**
     * Element containing the displayed warning on malformed property field.
     */
    warningEl: HTMLElement;

    /**
     * Focus on the key input element.
     */
    focusKey(): void;

    /**
     * Focus on the property (container element).
     */
    focusProperty(): void;

    /**
     * Focus on the value input element.
     */
    focusValue(which?: 'both' | 'end' | 'start'): void;

    /**
     * Reveal the property menu on click event.
     */
    handleItemClick(event: MouseEvent): void;

    /**
     * Focus on property on blur event.
     */
    handlePropertyBlur(): void;

    /**
     * Update key of property and saves, returns false if error.
     */
    handleUpdateKey(key: string): boolean;

    /**
     * Update value of property and saves.
     */
    handleUpdateValue(value: unknown): void;

    /**
     * Loads as draggable property element.
     */
    onload(): void;

    /**
     * Render property widget based on type.
     */
    renderProperty(entry: PropertyEntryData<unknown>, check_errors?: boolean, use_expected_type?: boolean): void;

    /**
     * Set the selected class of property.
     */
    setSelected(selected: boolean): void;

    /**
     * Reveal property selection menu at mouse event.
     */
    showPropertyMenu(event: MouseEvent): void;
}
