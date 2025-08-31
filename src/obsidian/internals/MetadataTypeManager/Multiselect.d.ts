import type { Menu } from 'obsidian';
import type { MultiselectOptionContextMenuContext } from './MultiselectOptionContextMenuContext.d.ts';

/**
 * Multiselect component.
 *
 * @public
 * @unofficial
 */
export interface Multiselect {
    /** The elements of the multiselect. */
    elements: HTMLDivElement[];

    /** The input element of the multiselect. */
    inputEl: HTMLDivElement;

    /** The text of the input element of the multiselect. */
    readonly inputText: string;

    /** The root element of the multiselect. */
    rootEl: HTMLDivElement;

    /** The values of the multiselect. */
    values: string[];

    /**
     * Create a new element for the multiselect.
     *
     * @param value - the value of the element.
     * @returns the created element or `null` if the value is not valid.
     */
    _createElement(value: string): string | null;

    /** Create a new input element for the multiselect. */
    _createInputEl(): HTMLDivElement;

    /**
     * Add a new element to the multiselect.
     *
     * @param value - the value of the element.
     * @returns `true` if the element was added, `false` otherwise.
     */
    addElement(value: string): boolean;

    /**
     * Allow creating options for the multiselect.
     *
     * @param createOption - the function to create an option.
     * @returns the multiselect.
     */
    allowCreatingOptions(createOption: (this: Multiselect, value: string) => string | undefined): this;

    /**
     * The callback for the change event.
     *
     * @param values - the values of the multiselect.
     */
    changeCallback?(values: string[]): void;

    /**
     * Create a new option for the multiselect.
     *
     * @param value - the value of the option.
     * @returns the created option or `undefined` if the value is not valid.
     */
    createOption?(this: Multiselect, value: string): string | undefined;

    /**
     * Edit an element of the multiselect.
     *
     * @param index - the index of the element.
     */
    editElement(index: number): void;

    /**
     * Find a duplicate in the multiselect.
     *
     * @param value - the value that will be checked for being a duplicate
     * @param values - the values to find a duplicate in.
     * @returns the index of value if duplicate, otherwise -1
     */
    findDuplicate?(value: string, values: string[]): number;

    /**
     * Focus an element of the multiselect.
     *
     * @param index - the index of the element.
     */
    focusElement(index: number): void;

    /**
     * Handle the change event of the multiselect.
     *
     * @param changeCallback - the callback to handle the change event.
     */
    onChange(changeCallback: (values: string[]) => void): void;

    /**
     * Handle the context menu event of the multiselect.
     *
     * @param menu - the menu to handle the context menu event.
     * @param value - the value of the element.
     */
    onOptionContextmenu?(this: Multiselect, menu: Menu, value: string, ctx: MultiselectOptionContextMenuContext): void;

    /** The renderer for the options of the multiselect. */
    optionRenderer?(value: string, ctx: MultiselectOptionContextMenuContext): void;

    /**
     * Prevent duplicates in the multiselect.
     *
     * @param findDuplicate - the function to find a duplicate.
     * @returns the multiselect.
     */
    preventDuplicates(findDuplicate: (value: string, values: string[]) => number): this;

    /**
     * Remove an element of the multiselect.
     *
     * @param index - the index of the element.
     */
    removeElement(index: number, shouldFocus?: boolean): void;

    /** Render the values of the multiselect. */
    renderValues(): void;

    /**
     * Set the text of the input element of the multiselect.
     *
     * @param text - the text to set.
     */
    setInputText(text: string): void;

    /**
     * Set the context menu handler of the multiselect.
     *
     * @param onOptionContextmenu - the function to handle the context menu event.
     * @returns the multiselect.
     */
    setOptionContextmenuHandler(
        onOptionContextmenu: (
            this: Multiselect,
            menu: Menu,
            value: string,
            ctx: MultiselectOptionContextMenuContext
        ) => void
    ): this;

    /**
     * Set the option renderer of the multiselect.
     *
     * @param optionRenderer - the function to render the options.
     * @returns the multiselect.
     */
    setOptionRenderer(optionRenderer: (value: string, ctx: MultiselectOptionContextMenuContext) => void): this;

    /**
     * The setup function for the input element of the multiselect.
     *
     * @param inputEl - the input element.
     * @param initializer - the initializer function.
     */
    setupInput?(
        this: Multiselect,
        inputEl: HTMLDivElement,
        initializer: (value: string, shouldFocus?: boolean) => unknown
    ): void;

    /**
     * Set the setup function for the input element of the multiselect.
     *
     * @param setupInput - the function to setup the input element.
     * @returns the multiselect.
     */
    setupInputEl(
        setupInput: (
            this: Multiselect,
            inputEl: HTMLDivElement,
            initializer: (value: string, shouldFocus?: boolean) => unknown
        ) => void
    ): this;

    /**
     * Set the values of the multiselect.
     *
     * @param values - the values to set.
     * @returns the multiselect.
     */
    setValues(values: string[] | null): this;

    /** Trigger the change event of the multiselect. */
    triggerChange(): void;
}
