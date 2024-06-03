import type {
    App,
    Component,
    HoverPopover,
    MarkdownView
} from "obsidian";
import type {
    MetadataEditorProperty,
    PropertyEntryData
} from "../types.d.ts";

export interface MetadataEditor extends Component {
    /**
     * Button element for adding a new property
     */
    addPropertyButtonEl: HTMLButtonElement;
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Whether the frontmatter editor is collapsed
     */
    collapsed: boolean;
    /**
     * Container element for the metadata editor
     */
    containerEl: HTMLElement;
    /**
     * Element containing metadata table and addPropertyButton
     */
    contentEl: HTMLElement;
    /**
     * The currently focused property
     */
    focusedLine: null | MetadataEditorProperty;
    /**
     * Fold button for folding away the frontmatter editor on hovering over headingEl
     */
    foldEl: HTMLElement;
    /**
     * Heading element for the metadata editor
     */
    headingEl: HTMLElement;
    /**
     * Hover element container
     */
    hoverPopover: null | HoverPopover;
    /**
     * Owner of the metadata editor
     */
    owner: MarkdownView;
    /**
     * All properties existing in the metadata editor
     */
    properties: PropertyEntryData<unknown>[];
    /**
     * Element containing all property elements
     */
    propertyListEl: HTMLElement;
    /**
     * List of all property field editors
     */
    rendered: MetadataEditorProperty[];
    /**
     * Set of all selected property editors
     */
    selectedLines: Set<MetadataEditorProperty>;

    /**
     * Convert given properties to a serialized object and store in clipboard as obsidian/properties
     */
    _copyToClipboard(event: ClipboardEvent, properties: MetadataEditorProperty[]): void;
    /**
     * Uncollapse editor if collapsed and create a new property row
     */
    addProperty(): void;
    /**
     * Clear all properties
     */
    clear(): void;
    /**
     * Unselect all lines
     */
    clearSelection(): void;
    /**
     * Focus on property field with given key
     */
    focusKey(key: string): void;
    /**
     * Focus on property
     */
    focusProperty(property: MetadataEditorProperty): void;
    /**
     * Focus on property at specified index
     */
    focusPropertyAtIndex(index: number): void;
    /**
     * Focus on property with value
     */
    focusValue(value: string, which: "both" | "end" | "start"): void;
    /**
     * Handle copy event on selection and serialize properties
     */
    handleCopy(event: ClipboardEvent): void;
    /**
     * Handle cut event and serialize and remove properties
     */
    handleCut(event: ClipboardEvent): void;
    /**
     * Handle selection of item for drag handling
     */
    handleItemSelection(event: PointerEvent, property: MetadataEditorProperty): boolean;
    /**
     * Handle key press event for controlling selection or movement of property up/down
     */
    handleKeypress(event: KeyboardEvent): void;
    /**
     * Handle paste event of properties into metadata editor
     */
    handlePaste(event: ClipboardEvent): void;
    /**
     * Whether the editor has focus
     */
    hasFocus(): boolean;
    /**
     * Whether there is a property that is focused
     */
    hasPropertyFocused(): boolean;
    /**
     * Add new properties to the metadata editor and save
     */
    insertProperties(properties: Record<string, any>): void;
    /**
     * On loading of the metadata editor, register on metadata type change event
     */
    onload(): void;
    /**
     * On vault metadata update, update property render
     */
    onMetadataTypeChange(property: MetadataEditorProperty): void;
    /**
     * Remove specified properties from the metadata editor and save, and reset focus if specified
     */
    removeProperties(properties: MetadataEditorProperty[], reset_focus?: boolean): unknown;
    /**
     * Reorder the entry to specified index position and save
     */
    reorderKey(entry: PropertyEntryData<unknown>, index: number): unknown;
    /**
     * Serialize the properties and save frontmatter
     */
    save(): void;
    /**
     * Select all property fields
     */
    selectAll(): void;
    /**
     * Mark specified property as selected
     */
    selectProperty(property: MetadataEditorProperty | undefined, select: boolean): void;
    /**
     * Convert properties to a serialized object
     */
    serialize(): Record<string, any>;
    /**
     * Sets frontmatter as collapsed or uncollapsed
     */
    setCollapse(collapsed: boolean, x: boolean): void;
    /**
     * On context menu event on header element, show property menu
     */
    showPropertiesMenu(event: MouseEvent): void;
    /**
     * Synchronize data with given properties and re-render them
     */
    synchronize(data: Record<string, any>): void;
    /**
     * Toggle collapsed state of the metadata editor
     */
    toggleCollapse(): void;
}
