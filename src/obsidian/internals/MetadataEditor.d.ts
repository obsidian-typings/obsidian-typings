import type {
    App,
    Component,
    HoverPopover,
    MarkdownView
} from 'obsidian';
import type { FocusMode } from './FocusMode.d.ts';
import type { MetadataEditorProperty } from './MetadataEditorProperty.d.ts';
import type { PropertyEntryData } from './PropertyEntryData.d.ts';

/**
 * Editor component for managing frontmatter property fields in a markdown view.
 * @public
 * @unofficial
 */
export interface MetadataEditor extends Component {
    /**
     * Convert given properties to a serialized object and store in clipboard as obsidian/properties.
     *
     * @param event - The clipboard event.
     * @param properties - Properties to copy.
     */
    _copyToClipboard(event: ClipboardEvent, properties: MetadataEditorProperty[]): void;

    /**
     * Uncollapse editor if collapsed and create a new property row.
     */
    addProperty(): void;

    /**
     * Button element for adding a new property.
     */
    addPropertyButtonEl: HTMLButtonElement;

    /**
     * Reference to the app.
     */
    app: App;

    /**
     * Clear all properties.
     */
    clear(): void;

    /**
     * Unselect all lines.
     */
    clearSelection(): void;

    /**
     * Whether the frontmatter editor is collapsed.
     */
    collapsed: boolean;

    /**
     * Container element for the metadata editor.
     */
    containerEl: HTMLElement;

    /**
     * Element containing metadata table and addPropertyButton.
     */
    contentEl: HTMLElement;

    /**
     * The currently focused property.
     */
    focusedLine: null | MetadataEditorProperty;

    /**
     * Focus on property field with given key.
     *
     * @param key - Property key to focus.
     */
    focusKey(key: string): void;

    /**
     * Focus on property.
     *
     * @param property - Property to focus.
     */
    focusProperty(property: MetadataEditorProperty): void;

    /**
     * Focus on property at specified index.
     *
     * @param index - Index of the property to focus.
     */
    focusPropertyAtIndex(index: number): void;

    /**
     * Focus on property with value.
     *
     * @param value - Value to focus.
     * @param mode - Focus mode.
     */
    focusValue(value: string, mode: FocusMode): void;

    /**
     * Fold button for folding away the frontmatter editor on hovering over headingEl.
     */
    foldEl: HTMLElement;

    /**
     * Handle copy event on selection and serialize properties.
     *
     * @param event - The clipboard event.
     */
    handleCopy(event: ClipboardEvent): void;

    /**
     * Handle cut event and serialize and remove properties.
     *
     * @param event - The clipboard event.
     */
    handleCut(event: ClipboardEvent): void;

    /**
     * Handle selection of item for drag handling.
     *
     * @param event - The pointer event.
     * @param property - Property being selected.
     * @returns Whether the selection was handled.
     */
    handleItemSelection(event: PointerEvent, property: MetadataEditorProperty): boolean;

    /**
     * Handle key press event for controlling selection or movement of property up/down.
     *
     * @param event - The keyboard event.
     */
    handleKeypress(event: KeyboardEvent): void;

    /**
     * Handle paste event of properties into metadata editor.
     *
     * @param event - The clipboard event.
     */
    handlePaste(event: ClipboardEvent): void;

    /**
     * Whether the editor has focus.
     *
     * @returns Whether the editor has focus.
     */
    hasFocus(): boolean;

    /**
     * Whether there is a property that is focused.
     *
     * @returns Whether a property is focused.
     */
    hasPropertyFocused(): boolean;

    /**
     * Heading element for the metadata editor.
     */
    headingEl: HTMLElement;

    /**
     * Hover element container.
     */
    hoverPopover: null | HoverPopover;

    /**
     * Add new properties to the metadata editor and save.
     *
     * @param properties - Properties to insert.
     */
    insertProperties(properties: Record<string, any>): void;

    /**
     * On loading of the metadata editor, register on metadata type change event.
     */
    onload(): void;

    /**
     * On vault metadata update, update property render.
     *
     * @param property - Property that changed.
     */
    onMetadataTypeChange(property: MetadataEditorProperty): void;

    /**
     * Owner of the metadata editor.
     */
    owner: MarkdownView;

    /**
     * All properties existing in the metadata editor.
     */
    properties: PropertyEntryData<unknown>[];

    /**
     * Element containing all property elements.
     */
    propertyListEl: HTMLElement;

    /**
     * Remove specified properties from the metadata editor and save, and reset focus if specified.
     *
     * @param properties - Properties to remove.
     * @param resetFocus - Whether to reset focus after removal.
     * @returns The result of the removal operation.
     */
    removeProperties(properties: MetadataEditorProperty[], resetFocus?: boolean): unknown;

    /**
     * List of all property field editors.
     */
    rendered: MetadataEditorProperty[];

    /**
     * Reorder the entry to specified index position and save.
     *
     * @param entry - Property entry to reorder.
     * @param index - Target index position.
     * @returns The result of the reorder operation.
     */
    reorderKey(entry: PropertyEntryData<unknown>, index: number): unknown;

    /**
     * Serialize the properties and save frontmatter.
     */
    save(): void;

    /**
     * Select all property fields.
     */
    selectAll(): void;

    /**
     * Set of all selected property editors.
     */
    selectedLines: Set<MetadataEditorProperty>;

    /**
     * Mark specified property as selected.
     *
     * @param property - Property to select.
     * @param select - Whether to select or deselect.
     */
    selectProperty(property: MetadataEditorProperty | undefined, select: boolean): void;

    /**
     * Convert properties to a serialized object.
     *
     * @returns Serialized properties object.
     */
    serialize(): Record<string, any>;

    /**
     * Sets frontmatter as collapsed or uncollapsed.
     *
     * @param collapsed - Whether to collapse.
     * @param x - Whether to animate the transition.
     */
    setCollapse(collapsed: boolean, x: boolean): void;

    /**
     * On context menu event on header element, show property menu.
     *
     * @param event - The mouse event.
     */
    showPropertiesMenu(event: MouseEvent): void;

    /**
     * Synchronize data with given properties and re-render them.
     *
     * @param data - Properties data to synchronize with.
     */
    synchronize(data: Record<string, any>): void;

    /**
     * Toggle collapsed state of the metadata editor.
     */
    toggleCollapse(): void;
}
