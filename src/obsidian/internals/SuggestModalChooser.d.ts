/** @public */
export interface SuggestModalChooser<T, TModal> {
    chooser: TModal;
    containerEl: HTMLDivElement;
    numVisibleItems: number;
    rowHeight: number;
    selectedItem: number;
    suggestions: HTMLDivElement[];
    values: T[] | null;

    addMessage(text: string | DocumentFragment): void;
    addSuggestion(value: T): void;
    forceSetSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;
    moveDown(evt: KeyboardEvent): false | void;
    moveUp(evt: KeyboardEvent): false | void;
    onSuggestionClick(evt: MouseEvent, suggestion: HTMLDivElement): void;
    onSuggestionMouseover(evt: MouseEvent, suggestion: HTMLDivElement): void;
    pageDown(evt: KeyboardEvent): false | void;
    pageUp(evt: KeyboardEvent): false | void;
    setSelectedItem(index: number, evt: MouseEvent | KeyboardEvent): void;
    setSuggestions(values: T[]): void;
    useSelectedItem(evt: MouseEvent | KeyboardEvent): void;
}
