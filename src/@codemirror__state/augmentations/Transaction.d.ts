import type {
  AnnotationType,
  ChangeSet,
  EditorSelection as CmEditorSelection,
  EditorState,
  StateEffect,
  Text
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  interface Transaction {
    /**
     * The document changes made by this transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link changes} instead.
     */
    readonly changes__: ChangeSet;

    /**
     * The effects added to the transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link effects} instead.
     */
    readonly effects__: readonly StateEffect<unknown>[];

    /**
     * Whether the selection should be scrolled into view after this transaction is dispatched.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scrollIntoView} instead.
     */
    readonly scrollIntoView__: boolean;

    /**
     * The selection set by this transaction, or `undefined` if it doesn't explicitly set a
     * selection.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selection} instead.
     */
    readonly selection__: CmEditorSelection | undefined;

    /**
     * The state from which the transaction starts.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link startState} instead.
     */
    readonly startState__: EditorState;

    /**
     * Get the value of the given annotation type, if any.
     *
     * @param type - The annotation type.
     * @returns The annotation value, or `undefined`.
     * @official
     */
    annotation<T>(type: AnnotationType<T>): T | undefined;

    /**
     * Indicates whether the transaction changed the document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link docChanged} instead.
     */
    get docChanged__(): boolean;

    /**
     * Returns `true` if the transaction has a user event annotation that is equal to or more
     * specific than `event`.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @official
     */
    isUserEvent(event: string): boolean;

    /**
     * Check whether the user dedents a line or lines, usually by typing `Shift + Tab` keys.
     * Included in `'delete'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'delete.dedent'): boolean;

    /**
     * Check whether the user deletes a line or lines, usually by typing `Ctrl + Shift + K` keys.
     * Included in `'delete'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'delete.line'): boolean;

    /**
     * Check whether the user inputs a content through Obsidian editor suggest autocompletion.
     * Currently, this event is only dispatched when autocompleting a wikilink or inserting Markdown link through command.
     * Included in `'input'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'input.autocomplete'): boolean;

    /**
     * Check whether the user creates a copy of the selected lines.
     * Usually dispatched when performing [`copyLineUp`](https://codemirror.net/docs/ref/#commands.copyLineUp) or [`copyLineDown`](https://codemirror.net/docs/ref/#commands.copyLineDown) commands.
     * Included in `'input'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'input.copyline'): boolean;
    /**
     * Check whether the user indents a line or lines, usually by typing `Tab` key.
     * Included in `'input'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'input.indent'): boolean;

    /**
     * Check whether the user replaces all search matches.
     * Usually dispatched when performing [`replaceAll`](https://codemirror.net/docs/ref/#commands.replaceAll) command.
     * Included in `'input'` and `'input.replace'` events.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @remark Obsidian native editor search does not dispatch this event.
     * @unofficial
     */
    isUserEvent(event: 'input.replace.matches'): boolean;

    /**
     * Check whether the user replaces search match(es).
     * Usually dispatched when performing [`replaceNext`](https://codemirror.net/docs/ref/#commands.replaceNext) or [`replaceAll`](https://codemirror.net/docs/ref/#commands.replaceAll) commands.
     * Included in `'input'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @remark Obsidian native editor search does not dispatch this event.
     * @unofficial
     */
    isUserEvent(event: 'input.replace'): boolean;

    /**
     * Check whether the user starts a composition input sequence.
     * Included in `'input'`, `'input.type'`, and `'input.type.compose'` events.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'input.type.compose.start'): boolean;

    /**
     * Check whether the user flips the characters before and after the cursor(s).
     * Usually dispatched when performing [`transposeChars`](https://codemirror.net/docs/ref/#commands.transposeChars) command.
     * Included in `'move'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'move.character'): boolean;

    /**
     * Check whether the user moves the selected line up or down.
     * Usually dispatched when performing [`moveLineUp`](https://codemirror.net/docs/ref/#commands.moveLineUp) or [`moveLineDown`](https://codemirror.net/docs/ref/#commands.moveLineDown) commands.
     * Included in `'move'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'move.line'): boolean;

    /**
     * Check whether the transaction is triggered by a scroll action.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'scroll'): boolean;

    /**
     * Check whether the user redoes a selection change.
     * Usually dispatched when performing [`redoSelection`](https://codemirror.net/docs/ref/#commands.redoSelection) command.
     * Included in `'select'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'select.redo'): boolean;

    /**
     * Check whether the user selects all search matches.
     * Usually dispatched when performing [`selectMatches`](https://codemirror.net/docs/ref/#search.selectMatches) and [`selectSelectionMatches`](https://codemirror.net/docs/ref/#search.selectSelectionMatches) commands.
     * Included in `'select'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @remark Obsidian native editor search does not dispatch this event.
     * @unofficial
     */
    isUserEvent(event: 'select.search.matches'): boolean;

    /**
     * Check whether the user selects search match(es).
     * Usually dispatched when performing [`findNext`](https://codemirror.net/docs/ref/#search.findNext) and [`findPrevious`](https://codemirror.net/docs/ref/#search.findPrevious) commands.
     * Included in `'select'` and `'select.search'` events.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @remark Obsidian native editor search does not dispatch this event.
     * @unofficial
     */
    isUserEvent(event: 'select.search'): boolean;

    /**
     * Check whether the user undoes a selection change.
     * Usually dispatched when performing [`undoSelection`](https://codemirror.net/docs/ref/#commands.undoSelection) command.
     * Included in `'select'` event.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'select.undo'): boolean;

    /**
     * Check whether a content change is not made explicitly by the user. It happens in some circumstances, for instance:
     * - Change made externally, e.g. by other text editor programs.
     * - Change made by another editor view that holds the same note.
     * - Change made by the vault, file manager, and file system API.
     *
     * @param event - The event type to check.
     * @returns Whether the transaction matches the event.
     * @unofficial
     */
    isUserEvent(event: 'set'): boolean;

    /**
     * The new document produced by the transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link newDoc} instead.
     */
    get newDoc__(): Text;

    /**
     * The new selection produced by the transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link newSelection} instead.
     */
    get newSelection__(): CmEditorSelection;

    /**
     * Indicates whether this transaction reconfigures the state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link reconfigured} instead.
     */
    get reconfigured__(): boolean;

    /**
     * The new state created by the transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link state} instead.
     */
    get state__(): EditorState;
  }

  namespace Transaction {
    /**
     * Annotation used to store transaction timestamps. Automatically added to every transaction,
     * holding `Date.now()`.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Transaction.time} instead.
     */
    const time__: AnnotationType<number>;

    /**
     * Annotation used to associate a transaction with a user interface event.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Transaction.userEvent} instead.
     */
    const userEvent__: AnnotationType<string>;

    /**
     * Annotation indicating whether a transaction should be added to the undo history or not.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Transaction.addToHistory} instead.
     */
    const addToHistory__: AnnotationType<boolean>;

    /**
     * Annotation indicating (when present and `true`) that a transaction represents a change
     * made by some other actor, not the user.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Transaction.remote} instead.
     */
    const remote__: AnnotationType<boolean>;
  }
}
