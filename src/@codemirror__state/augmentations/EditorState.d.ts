import type {
  ChangeSet,
  ChangeSpec,
  CharCategory,
  EditorSelection as CmEditorSelection,
  EditorStateConfig,
  Extension,
  Facet,
  FacetReader,
  SelectionRange,
  StateEffect,
  StateField,
  Text,
  Transaction,
  TransactionSpec
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  interface EditorState {
    /**
     * The current document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link doc} instead.
     */
    readonly doc__: Text;

    /**
     * The current selection.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selection} instead.
     */
    readonly selection__: CmEditorSelection;

    /**
     * Create a set of changes and a new selection by running the given function for each range
     * in the active selection.
     *
     * @param f - The function to call for each range.
     * @returns An object with changes, selection, and effects.
     * @official
     */
    changeByRange(
      f: (range: SelectionRange) => {
        range: SelectionRange;
        changes?: ChangeSpec;
        effects?: readonly StateEffect<unknown>[] | StateEffect<unknown>;
      }
    ): {
      changes: ChangeSet;
      selection: CmEditorSelection;
      effects: readonly StateEffect<unknown>[];
    };

    /**
     * Create a change set from the given change description.
     *
     * @param spec - The change spec.
     * @returns The created change set.
     * @official
     */
    changes(spec?: ChangeSpec): ChangeSet;

    /**
     * Return a function that can categorize strings into Word, Space, or Other.
     *
     * @param at - The position for context.
     * @returns The categorizer function.
     * @official
     */
    charCategorizer(at: number): (char: string) => CharCategory;

    /**
     * Get the value of a state facet.
     *
     * @param facet - The facet reader.
     * @returns The facet value.
     * @official
     */
    facet<Output>(facet: FacetReader<Output>): Output;

    /**
     * Retrieve the value of a state field. Throws an error when the state doesn't have that field,
     * unless you pass `false` as second parameter.
     *
     * @param field - The state field.
     * @returns The field value.
     * @official
     */
    field<T>(field: StateField<T>): T;

    /**
     * Retrieve the value of a state field, or `undefined` if not present.
     *
     * @param field - The state field.
     * @param require - Whether to throw if not present.
     * @returns The field value or `undefined`.
     * @official
     */
    field<T>(field: StateField<T>, require: false): T | undefined;

    /**
     * Find the values for a given language data field.
     *
     * @param name - The field name.
     * @param pos - The position.
     * @param side - The side.
     * @returns The language data values.
     * @official
     */
    languageDataAt<T>(name: string, pos: number, side?: -1 | 0 | 1): readonly T[];

    /**
     * Get the proper line-break string for this state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link lineBreak} instead.
     */
    get lineBreak__(): string;

    /**
     * Look up a translation for the given phrase.
     *
     * @param phrase - The phrase to translate.
     * @param insert - Values to insert into the phrase.
     * @returns The translated phrase.
     * @official
     */
    phrase(phrase: string, ...insert: unknown[]): string;

    /**
     * Returns `true` when the editor is configured to be read-only.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link readOnly} instead.
     */
    get readOnly__(): boolean;

    /**
     * Create a transaction spec that replaces every selection range with the given content.
     *
     * @param text - The replacement text.
     * @returns The transaction spec.
     * @official
     */
    replaceSelection(text: string | Text): TransactionSpec;

    /**
     * Return the given range of the document as a string.
     *
     * @param from - The start position.
     * @param to - The end position.
     * @returns The document slice.
     * @official
     */
    sliceDoc(from?: number, to?: number): string;

    /**
     * The size (in columns) of a tab in the document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link tabSize} instead.
     */
    get tabSize__(): number;

    /**
     * Convert this state to a JSON-serializable object.
     *
     * @param fields - Optional fields to serialize.
     * @returns The JSON representation.
     * @official
     */
    toJSON(fields?: { [prop: string]: StateField<unknown> }): unknown;

    /**
     * Using the state's line separator, create a Text instance from the given string.
     *
     * @param string - The string to convert.
     * @returns The created Text instance.
     * @official
     */
    toText(string: string): Text;

    /**
     * Create a transaction that updates this state.
     *
     * @param specs - The transaction specs.
     * @returns The created transaction.
     * @official
     */
    update(...specs: readonly TransactionSpec[]): Transaction;

    /**
     * Find the word at the given position.
     *
     * @param pos - The position.
     * @returns The word range, or `null` if no word is found.
     * @official
     */
    wordAt(pos: number): null | SelectionRange;
  }

  namespace EditorState {
    /**
     * Deserialize a state from its JSON representation.
     *
     * @param json - The JSON representation.
     * @param config - Optional editor state configuration.
     * @param fields - Optional fields to deserialize.
     * @returns The deserialized editor state.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.fromJSON} instead.
     */
    function fromJSON__(json: unknown, config?: EditorStateConfig, fields?: { [prop: string]: StateField<unknown> }): EditorState;

    /**
     * Create a new state.
     *
     * @param config - The editor state configuration.
     * @returns The created editor state.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.create} instead.
     */
    function create__(config?: EditorStateConfig): EditorState;

    /**
     * A facet that, when enabled, causes the editor to allow multiple ranges to be selected.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.allowMultipleSelections} instead.
     */
    const allowMultipleSelections__: Facet<boolean, boolean>;

    /**
     * Configures the tab size to use in this state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.tabSize} instead.
     */
    const tabSize__: Facet<number, number>;

    /**
     * The line separator to use.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.lineSeparator} instead.
     */
    const lineSeparator__: Facet<string, string | undefined>;

    /**
     * This facet controls the value of the readOnly getter.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.readOnly} instead.
     */
    const readOnly__: Facet<boolean, boolean>;

    /**
     * Registers translation phrases.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.phrases} instead.
     */
    const phrases__: Facet<{ [key: string]: string }, readonly { [key: string]: string }[]>;

    /**
     * A facet used to register language data providers.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.languageData} instead.
     */
    const languageData__: Facet<
      (state: EditorState, pos: number, side: -1 | 0 | 1) => readonly { [name: string]: unknown }[],
      readonly ((state: EditorState, pos: number, side: -1 | 0 | 1) => readonly { [name: string]: unknown }[])[]
    >;

    /**
     * Facet used to register change filters.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.changeFilter} instead.
     */
    const changeFilter__: Facet<(tr: Transaction) => boolean | readonly number[], readonly ((tr: Transaction) => boolean | readonly number[])[]>;

    /**
     * Facet used to register a hook that gets a chance to update or replace transaction specs.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.transactionFilter} instead.
     */
    const transactionFilter__: Facet<
      (tr: Transaction) => readonly TransactionSpec[] | TransactionSpec,
      readonly ((tr: Transaction) => readonly TransactionSpec[] | TransactionSpec)[]
    >;

    /**
     * A more limited form of transactionFilter which can only add annotations and effects.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorState.transactionExtender} instead.
     */
    const transactionExtender__: Facet<
      (tr: Transaction) => null | Pick<TransactionSpec, 'annotations' | 'effects'>,
      readonly ((tr: Transaction) => null | Pick<TransactionSpec, 'annotations' | 'effects'>)[]
    >;
  }
}
