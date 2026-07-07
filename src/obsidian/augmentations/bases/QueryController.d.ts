import type { getQueryControllerConstructor } from '../../implementations/constructors/augmentations/bases/getQueryControllerConstructor.d.ts';
import type { BasesContext } from '../../internals/internal-plugins/bases/BasesContext.d.ts';
import type { BasesFilter } from '../../internals/internal-plugins/bases/BasesFilter.d.ts';
import type { BasesFilterMenu } from '../../internals/internal-plugins/bases/BasesFilterMenu.d.ts';
import type { BasesMockContext } from '../../internals/internal-plugins/bases/BasesMockContext.d.ts';
import type { BasesNewItemMenu } from '../../internals/internal-plugins/bases/BasesNewItemMenu.d.ts';
import type { BasesPluginInstance } from '../../internals/internal-plugins/bases/BasesPluginInstance.d.ts';
import type { BasesPropertyMenu } from '../../internals/internal-plugins/bases/BasesPropertyMenu.d.ts';
import type { BasesQuery } from '../../internals/internal-plugins/bases/BasesQuery.d.ts';
import type { BasesQueryQueue } from '../../internals/internal-plugins/bases/BasesQueryQueue.d.ts';
import type { BasesResultsMenu } from '../../internals/internal-plugins/bases/BasesResultsMenu.d.ts';
import type { BasesSearchMenu } from '../../internals/internal-plugins/bases/BasesSearchMenu.d.ts';
import type { BasesSortMenu } from '../../internals/internal-plugins/bases/BasesSortMenu.d.ts';
import type { BasesViewMenu } from '../../internals/internal-plugins/bases/BasesViewMenu.d.ts';
import type { EditorLanguageSupport } from '../../internals/internal-plugins/bases/EditorLanguageSupport.d.ts';

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
     * The app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * The current evaluation context, or `null` if none has been built yet.
     *
     * @unofficial
     */
    ctx: BasesContext | null;

    /**
     * The file the query is evaluated against, or `null` if none.
     *
     * @unofficial
     */
    currentFile: null | TFile;

    /**
     * The category of the currently displayed error (e.g. `'query'` or `'view'`), or `null` if none.
     *
     * @unofficial
     */
    error: null | string;

    /**
     * The element that displays errors in place of the view.
     *
     * @unofficial
     */
    errorEl: HTMLDivElement;

    /**
     * The error messages collected during the current query run.
     *
     * @unofficial
     */
    errors: Set<string>;

    /**
     * The event registry, emitting `'view-changed'` when the active view changes.
     *
     * @unofficial
     */
    events: Events;

    /**
     * The filter menu.
     *
     * @unofficial
     */
    filterMenu: BasesFilterMenu;

    /**
     * Whether the initial scan of the query results is in progress.
     *
     * @unofficial
     */
    initialScan: boolean;

    /**
     * The mock context used to evaluate identifiers and resolve widget types.
     *
     * @unofficial
     */
    mockContext: BasesMockContext;

    /**
     * The new item menu.
     *
     * @unofficial
     */
    newItemMenu: BasesNewItemMenu;

    /**
     * The Bases plugin instance.
     *
     * @unofficial
     */
    plugin: BasesPluginInstance;

    /**
     * The property menu.
     *
     * @unofficial
     */
    propertyMenu: BasesPropertyMenu;

    /**
     * The current query, or `null` if none is set.
     *
     * @unofficial
     */
    query: BasesQuery | null;

    /**
     * A serialized snapshot of the last-run query state, used to skip redundant re-runs, or `null` when cleared.
     *
     * @unofficial
     */
    queryState: null | string;

    /**
     * The scan queue that streams vault files into the query.
     *
     * @unofficial
     */
    queue: BasesQueryQueue;

    /**
     * The lowercased property keys relevant to the current results.
     *
     * @unofficial
     */
    relevantProperties: Set<string>;

    /**
     * Debounced {@link QueryController.notifyView}.
     *
     * @unofficial
     */
    requestNotifyView: Debouncer<[], void>;

    /**
     * The recorded result entries, keyed by file.
     *
     * @unofficial
     */
    results: Map<TFile, BasesEntry>;

    /**
     * The results menu.
     *
     * @unofficial
     */
    resultsMenu: BasesResultsMenu;

    /**
     * The search menu.
     *
     * @unofficial
     */
    searchMenu: BasesSearchMenu;

    /**
     * The current search query, or `null` if none is set.
     *
     * @unofficial
     */
    searchQuery: null | string;

    /**
     * The sort menu.
     *
     * @unofficial
     */
    sortMenu: BasesSortMenu;

    /**
     * The active Bases view, or `null` if none.
     *
     * @unofficial
     */
    view: BasesView | null;

    /**
     * The container element that hosts the active view.
     *
     * @unofficial
     */
    viewContainerEl: HTMLDivElement;

    /**
     * Per-view ephemeral state, keyed by view name.
     *
     * @unofficial
     */
    viewEstates: Record<string, unknown>;

    /**
     * The view header (toolbar) element.
     *
     * @unofficial
     */
    viewHeaderEl: HTMLDivElement;

    /**
     * The view menu.
     *
     * @unofficial
     */
    viewMenu: BasesViewMenu;

    /**
     * The name of the currently selected view.
     *
     * @unofficial
     */
    viewName: string;

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
     * @param filters - The additional filters to combine with the query's own filters.
     * @returns The evaluation context.
     * @unofficial
     */
    buildBasesContext(filters?: BasesFilter): BasesContext;

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
     * @param containerEl - The container element the controller renders into (the view header and view container are created inside it).
     * @param currentFile - The current file the query is evaluated against.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__?(app: App, plugin: BasesPluginInstance, containerEl: HTMLElement, currentFile?: null | TFile): this;

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
    getEditorLanguageSupport(): EditorLanguageSupport;

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
    runQuery(context: BasesContext): void;

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
    setQuery(query: BasesQuery | Error): void;

    /**
     * Sets both the query and the selected view name.
     *
     * @param query - The query to set.
     * @param viewName - The view name to select.
     * @unofficial
     */
    setQueryAndView(query: BasesQuery | Error, viewName: string): void;

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
