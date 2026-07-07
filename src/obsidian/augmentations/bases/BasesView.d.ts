import type { ExtractConstructor } from '../../internals/constructors/ExtractConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Plugins can create a class which extends this in order to render a Base.
   * Plugins should create a {@link BaseViewHandlerFactory} function, then call
   * `plugin.registerView` to register the view factory.
   *
   * @since 1.10.0
   */
  interface BasesView extends Component {
    /**
     * All available properties from the dataset.
     *
     * @official
     * @since 1.10.0
     */
    allProperties: BasesPropertyId[];

    /**
     * Reference to the app instance.
     *
     * @official
     * @since 1.10.0
     */
    app: App;

    /**
     * The config object for this view.
     *
     * @official
     * @since 1.10.0
     */
    config: BasesViewConfig;

    /**
     * The most recent output from executing the bases query, applying filters, and evaluating formulas.
     * This object will be replaced with a new result set when changes to the vault or Bases config occur,
     * so views should not keep a reference to it. Also note the contained {@link obsidian#BasesEntry} objects will be recreated.
     *
     * @official
     * @since 1.10.0
     */
    data: BasesQueryResult;

    /**
     * The query controller driving this view.
     *
     * @unofficial
     */
    queryController: QueryController;

    /**
     * The redo stack of transactions.
     *
     * @unofficial
     */
    redoStack: BasesViewTransaction[];

    /**
     * The type ID of this view
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link type} instead.
     */
    type__?: string;

    /**
     * The undo stack of transactions.
     *
     * @unofficial
     */
    undoStack: BasesViewTransaction[];

    /**
     * Constructor.
     *
     * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<BasesView\>}.
     *
     * @param controller - The query controller.
     * @returns The new {@link obsidian#BasesView}.
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes.
     */
    constructor2__?(controller: QueryController): this;

    /**
     * Copies the current table to the clipboard (as TSV and Markdown).
     *
     * @unofficial
     */
    copyToClipboard(): void;

    /**
     * Display the new note menu for a file with the provided filename and optionally a function to modify the frontmatter.
     *
     * @param baseFileName - The filename of the base file.
     * @param frontmatterProcessor - A function to modify the frontmatter.
     * @returns A promise that resolves when the file is created.
     * @official
     * @since 1.10.2
     */
    createFileForView(baseFileName?: string, frontmatterProcessor?: (frontmatter: unknown) => void): Promise<void>;

    /**
     * Creates the heading element for a result group.
     *
     * @param group - The group to create a heading for.
     * @returns The heading element, or `null` when the group has no key.
     * @unofficial
     */
    createGroupHeadingEl(group: BasesQueryResultGroup): HTMLElement | null;

    /**
     * Creates a property-value renderer for a property within a container element.
     *
     * @param property - The property identifier.
     * @param el - The container element.
     * @returns The created renderer.
     * @unofficial
     */
    createRenderer(property: BasesPropertyId, el: HTMLElement): unknown;

    /**
     * Runs a batch of property changes as one transaction that can be undone and redone.
     *
     * @param callback - Receives the changes array to populate.
     * @returns A promise that resolves when the transaction is committed.
     * @unofficial
     */
    createTransaction(callback: (changes: BasesViewTransactionChange[]) => Promise<void> | void): Promise<void>;

    /**
     * Builds an exportable representation of the current table.
     *
     * @returns The exportable table.
     * @unofficial
     */
    exportTable(): unknown;

    /**
     * Focuses the view.
     *
     * @unofficial
     */
    focus(): void;

    /**
     * Gets the view's ephemeral (non-persisted) state.
     *
     * @returns The ephemeral state.
     * @unofficial
     */
    getEphemeralState(): Record<string, unknown>;

    /**
     * Gets the view's toolbar actions.
     *
     * @returns The view actions.
     * @unofficial
     */
    getViewActions(): unknown[];

    /**
     * Called when there is new data for the query. This view should rerender with the updated data.
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link onDataUpdated} instead.
     */
    onDataUpdated__?(): void;

    /**
     * Handles a resize of the view container.
     *
     * @unofficial
     */
    onResize(): void;

    /**
     * Redoes the most recently undone transaction.
     *
     * @returns A promise that resolves when the redo completes.
     * @unofficial
     */
    redoTransaction(): Promise<void>;

    /**
     * Restores the view's ephemeral state.
     *
     * @param state - The ephemeral state to apply.
     * @unofficial
     */
    setEphemeralState(state: unknown): void;

    /**
     * Undoes the most recent transaction.
     *
     * @returns A promise that resolves when the undo completes.
     * @unofficial
     */
    undoTransaction(): Promise<void>;

    /**
     * Updates a single frontmatter property on a file within a transaction.
     *
     * @param file - The file to update.
     * @param property - The property to update.
     * @param value - The new value.
     * @returns A promise that resolves when the update is committed.
     * @unofficial
     */
    updateProperty(file: TFile, property: BasesPropertyId, value: unknown): Promise<void>;
  }
}
