import type { Menu } from 'obsidian';
import type { OptionContext } from './OptionContext.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface Multiselect {
    /** @todo Documentation incomplete. */
    changeCallback?: (values: string[]) => void;

    /** @todo Documentation incomplete. */
    elements: HTMLDivElement[];

    /** @todo Documentation incomplete. */
    inputEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    readonly inputText: string;

    /** @todo Documentation incomplete. */
    optionRenderer?: (value: string, ctx: OptionContext) => void;

    /** @todo Documentation incomplete. */
    rootEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    setupInput: (
        this: Multiselect,
        inputEl: HTMLDivElement,
        initializer: (value: string, shouldFocus?: boolean) => unknown
    ) => void;

    /** @todo Documentation incomplete. */
    values: string[];

    /** @todo Documentation incomplete. */
    _createElement(value: string): string | null;

    /** @todo Documentation incomplete. */
    _createInputEl(): HTMLDivElement;

    /** @todo Documentation incomplete. */
    addElement(value: string): boolean;

    /** @todo Documentation incomplete. */
    allowCreatingOptions(createOption: (this: Multiselect, value: string) => string | undefined): this;

    /** @todo Documentation incomplete. */
    createOption?(this: Multiselect, value: string): string | undefined;

    /** @todo Documentation incomplete. */
    editElement(index: number): void;

    /** @todo Documentation incomplete. */
    findDuplicate?(this: Multiselect, values: string[]): boolean;

    /** @todo Documentation incomplete. */
    focusElement(index: number): void;

    /** @todo Documentation incomplete. */
    onChange(changeCallback: (values: string[]) => void): void;

    /** @todo Documentation incomplete. */
    onOptionContextmenu?(this: Multiselect, menu: Menu, value: string, ctx: OptionContext): void;

    /** @todo Documentation incomplete. */
    preventDuplicates(findDuplicate: (this: Multiselect, values: string[]) => number): this;

    /** @todo Documentation incomplete. */
    removeElement(index: number, shouldFocus?: boolean): void;

    /** @todo Documentation incomplete. */
    renderValues(): void;

    /** @todo Documentation incomplete. */
    setInputText(text: string): void;

    /** @todo Documentation incomplete. */
    setOptionContextmenuHandler(
        onOptionContextmenu: (this: Multiselect, menu: Menu, value: string, ctx: OptionContext) => void
    ): this;

    /** @todo Documentation incomplete. */
    setOptionRenderer(optionRenderer: (value: string, ctx: OptionContext) => void): this;

    /** @todo Documentation incomplete. */
    setupInputEl(
        setupInput: (
            this: Multiselect,
            inputEl: HTMLDivElement,
            initializer: (value: string, shouldFocus?: boolean) => unknown
        ) => void
    ): this;

    /** @todo Documentation incomplete. */
    setValues(values: string[] | null): this;

    /** @todo Documentation incomplete. */
    triggerChange(): void;
}
