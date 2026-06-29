import type { getQueryControllerConstructor } from '../../implementations/constructors/augmentations/bases/getQueryControllerConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Responsible for executing the Bases query and evaluating filters and formulas.
   * Notifies views of updated results.
   *
   * @since 1.10.0
   */
  interface QueryController extends Component {
    /**
     * Records a query result entry for a file.
     *
     * @param file - The file the entry belongs to.
     * @param entry - The result entry.
     * @unofficial
     */
    addResult(file: TFile, entry: BasesEntry): void;

    /**
     * Filters entries by the current search query.
     *
     * @param entries - The entries to filter.
     * @param order - The property order used to read values from each entry.
     * @returns The filtered entries.
     * @unofficial
     */
    applySearchQuery(entries: BasesEntry[], order: BasesPropertyId[]): BasesEntry[];

    /**
     * Builds the Bases evaluation context from the query's filters and formulas.
     *
     * @param filters - The additional filters to apply.
     * @returns The evaluation context.
     * @unofficial
     */
    buildBasesContext(filters: unknown): unknown;

    /**
     * Clears the current query and view state.
     *
     * @unofficial
     */
    clear(): void;

    /**
     * Clears the currently displayed error.
     *
     * @unofficial
     */
    clearError(): void;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getQueryControllerConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app.
     * @param plugin - The plugin.
     * @param viewHeaderEl - The viewHeaderEl.
     * @param currentFile - The currentFile.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(app: App, plugin: unknown, viewHeaderEl: HTMLElement, currentFile?: null | TFile): this;

    /**
     * Displays an error in place of the view.
     *
     * @param type - The error category (e.g. `'query'` or `'view'`).
     * @param error - The error to display.
     * @unofficial
     */
    displayError(type: string, error: Error): void;

    /**
     * Pre-evaluates the properties relevant to the given entries.
     *
     * @param entries - The entries whose relevant properties to evaluate.
     * @unofficial
     */
    evaluateRelevantProperties(entries: BasesEntry[]): void;

    /**
     * Gets the active Bases view if it is an instance of the given type.
     *
     * @typeParam T - The view type.
     * @param type - The view constructor to match.
     * @returns The active view, or `null` if it is not of the given type.
     * @unofficial
     */
    getActiveBasesViewOfType<T extends BasesView>(type: Constructor<T>): null | T;

    /**
     * Gets the current file the query is evaluated against.
     *
     * @returns The current file, or `null` if none.
     * @unofficial
     */
    getCurrentFile(): null | TFile;

    /**
     * Gets the editor language support used for the query editor.
     *
     * @returns The editor language support.
     * @unofficial
     */
    getEditorLanguageSupport(): unknown;

    /**
     * Gets the controller's ephemeral state.
     *
     * @returns The ephemeral state.
     * @unofficial
     */
    getEphemeralState(): QueryControllerEphemeralState;

    /**
     * Gets the property identifiers available to the query.
     *
     * @returns The available property identifiers.
     * @unofficial
     */
    getProperties(): BasesPropertyId[];

    /**
     * Gets the names of the views defined in the query.
     *
     * @returns The view names.
     * @unofficial
     */
    getQueryViewNames(): string[];

    /**
     * Gets the current search query string.
     *
     * @returns The search query, or `null` if none is set.
     * @unofficial
     */
    getSearchQuery(): null | string;

    /**
     * Gets the config for the currently selected view.
     *
     * @returns The view config.
     * @unofficial
     */
    getViewConfig(): BasesViewConfig;

    /**
     * Gets the widget type identifier for a property identifier.
     *
     * @param ident - The property identifier.
     * @returns The widget type identifier.
     * @unofficial
     */
    getWidgetForIdent(ident: string): string;

    /**
     * Notifies the active view of updated results.
     *
     * @unofficial
     */
    notifyView(): void;

    /**
     * Handles a config change.
     *
     * @param key - The config key that changed.
     * @unofficial
     */
    onConfigChanged(key: string): void;

    /**
     * Handles a resize of the view container.
     *
     * @unofficial
     */
    onResize(): void;

    /**
     * Prompts the user to add a new view.
     *
     * @unofficial
     */
    promptForAddView(): void;

    /**
     * Removes a previously recorded result entry for a file.
     *
     * @param file - The file whose entry to remove.
     * @unofficial
     */
    removeResult(file: TFile): void;

    /**
     * Runs the query against the given context.
     *
     * @param context - The evaluation context.
     * @unofficial
     */
    runQuery(context: unknown): void;

    /**
     * Selects the view with the given name.
     *
     * @param viewName - The name of the view to select.
     * @unofficial
     */
    selectView(viewName: string): void;

    /**
     * Sets the controller's ephemeral state.
     *
     * @param state - The ephemeral state to apply.
     * @unofficial
     */
    setEphemeralState(state: Partial<QueryControllerEphemeralState>): void;

    /**
     * Sets the query, or displays an error if an Error is given.
     *
     * @param query - The query to set, or an Error to display.
     * @unofficial
     */
    setQuery(query: unknown): void;

    /**
     * Sets both the query and the selected view name.
     *
     * @param query - The query to set.
     * @param viewName - The view name to select.
     * @unofficial
     */
    setQueryAndView(query: unknown, viewName: string): void;

    /**
     * Starts the loading indicator.
     *
     * @unofficial
     */
    startLoader(): void;

    /**
     * Stops the loading indicator.
     *
     * @unofficial
     */
    stopLoader(): void;

    /**
     * Re-evaluates the query for the current view.
     *
     * @unofficial
     */
    update(): void;

    /**
     * Updates the current file and re-runs the query if needed.
     *
     * @param file - The new current file.
     * @unofficial
     */
    updateCurrentFile(file: TFile): void;

    /**
     * Updates the search query and re-notifies the view if it changed.
     *
     * @param searchQuery - The new search query.
     * @unofficial
     */
    updateSearchQuery(searchQuery: string): void;
  }
}
