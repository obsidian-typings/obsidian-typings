/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface SuggestModalChooser<T, TModal> {
    /** @todo Documentation incomplete. */
    chooser: TModal;

    /** @todo Documentation incomplete. */
    containerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    numVisibleItems: number;

    /** @todo Documentation incomplete. */
    rowHeight: number;

    /** @todo Documentation incomplete. */
    selectedItem: number;

    /** @todo Documentation incomplete. */
    suggestions: HTMLDivElement[];

    /** @todo Documentation incomplete. */
    values: T[] | null;

    /** @todo Documentation incomplete. */
    addMessage(text: string | DocumentFragment): void;

    /** @todo Documentation incomplete. */
    addSuggestion(value: T): void;

    /** @todo Documentation incomplete. */
    forceSetSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /** @todo Documentation incomplete. */
    moveDown(evt: KeyboardEvent): false | void;

    /** @todo Documentation incomplete. */
    moveUp(evt: KeyboardEvent): false | void;

    /** @todo Documentation incomplete. */
    onSuggestionClick(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /** @todo Documentation incomplete. */
    onSuggestionMouseover(evt: MouseEvent, suggestion: HTMLDivElement): void;

    /** @todo Documentation incomplete. */
    pageDown(evt: KeyboardEvent): false | void;

    /** @todo Documentation incomplete. */
    pageUp(evt: KeyboardEvent): false | void;

    /** @todo Documentation incomplete. */
    setSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;

    /** @todo Documentation incomplete. */
    setSuggestions(values: T[]): void;

    /** @todo Documentation incomplete. */
    useSelectedItem(evt: MouseEvent | KeyboardEvent): void;
}
