import type {
    PopoverSuggest,
    SearchComponent,
    SearchResult
} from 'obsidian';
import type { PropertyPropertyWidgetComponentComboBoxItem } from './PropertyPropertyWidgetComponentComboBoxItem.d.ts';

/**
 * Combobox component for {@link PropertyPropertyWidgetComponent}.
 *
 * @public
 * @unofficial
 */
export interface PropertyPropertyWidgetComponentComboBox
    extends PopoverSuggest<PropertyPropertyWidgetComponentComboBoxItem>
{
    /** The items of the combobox. */
    _items: PropertyPropertyWidgetComponentComboBoxItem[];

    /** The background element of the combobox. */
    bgEl: HTMLDivElement;

    /** The button element of the combobox. */
    buttonEl: HTMLDivElement;

    /** Whether the combobox is clearable. */
    clearable: boolean;

    /** The icon element of the combobox. */
    iconEl: HTMLDivElement;

    /** The label element of the combobox. */
    labelEl: HTMLDivElement;

    /** The search component of the combobox. */
    searchComponent: SearchComponent;

    /** The current value of the combobox. */
    value: PropertyPropertyWidgetComponentComboBoxItem | null;

    /**
     * Callback for `onClose`.
     */
    _onClose?(): void;

    /**
     * Callback for `onOpen`.
     */
    _onOpen?(): void;

    /** Attach the DOM of the combobox. */
    attachDom(): void;

    /** Detach the DOM of the combobox. */
    detachDom(): Promise<void>;

    /** Focus the combobox. */
    focus(): void;

    /** Get the items of the combobox. */
    getItems(): PropertyPropertyWidgetComponentComboBoxItem[];

    /**
     * Callback for `getSuggestions`.
     */
    getSuggestions(query: string): SearchResult[];

    /**
     * Register a callback for `close` event.
     *
     * @param callback - the callback to register.
     */
    onClose(callback: () => void): this;

    /**
     * Handle the input change event of the combobox.
     *
     * @param query - the query to handle.
     */
    onInputChange(query: string): void;

    /**
     * Register a callback for `open` event.
     *
     * @param callback - the callback to register.
     */
    onOpen(callback: () => void): this;

    /**
     * Register a callback for `select` event.
     *
     * @param callback - the callback to register.
     */
    onSelect(callback: (item: PropertyPropertyWidgetComponentComboBoxItem) => void): this;

    /** Render the label of the combobox. */
    renderLabel(): void;

    /**
     * Callback for `onSelect`.
     *
     * @param item - the item that was selected.
     */
    selectCb?(item: PropertyPropertyWidgetComponentComboBoxItem): void;

    /**
     * Set the clearable state of the combobox.
     *
     * @param clearable - whether the combobox should be clearable.
     * @returns the combobox.
     */
    setClearable(clearable: boolean): this;

    /**
     * Set the items of the combobox.
     *
     * @param items - the items to set.
     * @returns the combobox.
     */
    setItems(items: PropertyPropertyWidgetComponentComboBoxItem[]): this;

    /**
     * Set the placeholder of the combobox.
     *
     * @param placeholder - the placeholder to set.
     * @returns the combobox.
     */
    setPlaceholder(placeholder: string): this;

    /**
     * Set the value of the combobox.
     *
     * @param value - the value to set.
     * @returns the combobox.
     */
    setValue(value: PropertyPropertyWidgetComponentComboBoxItem): this;

    /**
     * Set the value of the combobox by its id.
     *
     * @param id - the id of the value to set.
     * @returns the combobox.
     */
    setValueById(id: string): this;

    /** Toggle the combobox. */
    toggle(): unknown;

    /**
     * Update the value of the combobox.
     *
     * @param value - the value to update.
     * @returns the combobox.
     */
    updateValue(value: PropertyPropertyWidgetComponentComboBoxItem): this;
}
