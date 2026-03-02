import type {
    App,
    Component,
    Debouncer,
    Events,
    TFile,
    View
} from 'obsidian';
import type { PromisedQueue } from '../../PromisedQueue.d.ts';
import type { BasesContext } from './BasesContext.d.ts';
import type { BasesFilter } from './BasesFilter.d.ts';
import type { BasesFilterMenu } from './BasesFilterMenu.d.ts';
import type { BasesMockContext } from './BasesMockContext.d.ts';
import type { BasesNewItemMenu } from './BasesNewItemMenu.d.ts';
import type { BasesPluginInstance } from './BasesPluginInstance.d.ts';
import type { BasesPropertyMenu } from './BasesPropertyMenu.d.ts';
import type { BasesQuery } from './BasesQuery.d.ts';
import type { BasesResultsMenu } from './BasesResultsMenu.d.ts';
import type { BasesSortMenu } from './BasesSortMenu.d.ts';
import type { BasesViewMenu } from './BasesViewMenu.d.ts';
import type { EditorLanguageSupport } from './EditorLanguageSupport.d.ts';

/**
 * Controller for the view.
 *
 * @public
 * @unofficial
 */
export interface BasesController extends Component {
    /**
     * The Obsidian app instance.
     */
    app: App;

    /**
     * The context of the view controller.
     */
    ctx: BasesContext;

    /**
     * The current file.
     */
    currentFile: TFile | null;

    /**
     * The current error.
     */
    error: string | null;

    /**
     * The error element.
     */
    errorEl: HTMLDivElement;

    /**
     * The errors.
     */
    errors: Set<string>;

    /**
     * The events.
     */
    events: Events;

    /**
     * The filter menu.
     */
    filterMenu: BasesFilterMenu;

    /**
     * Whether the initial scan has been completed.
     */
    initialScan: boolean;

    /**
     * The mock context.
     */
    mockContext: BasesMockContext;

    /**
     * The new item menu.
     */
    newItemMenu: BasesNewItemMenu;

    /**
     * The plugin instance.
     */
    plugin: BasesPluginInstance;

    /**
     * The property menu.
     */
    propertyMenu: BasesPropertyMenu;

    /**
     * The query.
     */
    query: BasesQuery | null;

    /**
     * The query state.
     */
    queryState: string;

    /**
     * The queue.
     */
    queue: PromisedQueue;

    /**
     * The relevant properties.
     */
    relevantProperties: Set<string>;

    /**
     * The request to notify the view.
     */
    requestNotifyView: Debouncer<[], void>;

    /**
     * The results.
     */
    results: Map<unknown, unknown>;

    /**
     * The results menu.
     */
    resultsMenu: BasesResultsMenu;

    /**
     * The sort menu.
     */
    sortMenu: BasesSortMenu;

    /**
     * The view.
     */
    view: View;

    /**
     * The view container element.
     */
    viewContainerEl: HTMLDivElement;

    /**
     * The view states.
     */
    viewEstates: Record<string, unknown>;

    /**
     * The view header element.
     */
    viewHeaderEl: HTMLDivElement;

    /**
     * The view menu.
     */
    viewMenu: BasesViewMenu;

    /**
     * The view name.
     */
    viewName: string;

    /**
     * Adds a result to the results.
     *
     * @param result - The result to add.
     * @returns The add result.
     */
    addResult(result: unknown, arg2: unknown): unknown;

    /**
     * Builds the bases context.
     *
     * @param filter - The filter to apply.
     * @returns The constructed bases context.
     */
    buildBasesContext(filter: BasesFilter): BasesContext;

    /**
     * Clears the view controller.
     */
    clear(): void;

    /**
     * Clears the error.
     */
    clearError(): void;

    /**
     * Displays an error.
     *
     * @param error - The error message to display.
     */
    displayError(error: string, arg2: unknown): void;

    /**
     * Evaluates the relevant properties.
     *
     * @param relevantProperties - The property names to evaluate.
     */
    evaluateRelevantProperties(relevantProperties: string[]): void;

    /**
     * Gets the active bases view of a given type.
     *
     * @param viewType - The view type to search for.
     * @returns The active view of the given type, or null.
     */
    getActiveBasesViewOfType(viewType: string): View | null;

    /**
     * Gets the current file.
     *
     * @returns The current file, or null.
     */
    getCurrentFile(): TFile | null;

    /**
     * Gets the editor language support.
     *
     * @returns The editor language support instance.
     */
    getEditorLanguageSupport(): EditorLanguageSupport;

    /**
     * Gets the mock value.
     *
     * @returns The mock value.
     */
    getMockValue(arg1: unknown): unknown;

    /**
     * Gets the mock value for an ident.
     *
     * @returns The mock value for the identifier.
     */
    getMockValueForIdent(arg1: unknown): unknown;

    /**
     * Gets the properties.
     *
     * @returns The list of properties.
     */
    getProperties(): unknown[];

    /**
     * Gets the query view names.
     *
     * @returns The list of query view names.
     */
    getQueryViewNames(): string[];

    /**
     * Gets the view config.
     *
     * @returns The view configuration.
     */
    getViewConfig(): unknown;

    /**
     * Gets the widget for an ident.
     *
     * @param type - The identifier type.
     * @returns The widget type string.
     */
    getWidgetForIdent(type: string): string;

    /**
     * Notifies the view.
     */
    notifyView(): void;

    /**
     * On config changed.
     *
     * @param configKey - The changed configuration key.
     */
    onConfigChanged(configKey: string): void;

    /**
     * On resize.
     */
    onResize(): void;

    /**
     * Prompt for add view.
     */
    promptForAddView(): void;

    /**
     * Removes a result.
     *
     * @returns The removal result.
     */
    removeResult(arg1: unknown): unknown;

    /**
     * Runs a query.
     */
    runQuery(arg1: unknown): void;

    /**
     * Selects a view.
     *
     * @param viewName - The name of the view to select.
     */
    selectView(viewName: string): void;

    /**
     * Sets the query.
     *
     * @param queryOrError - The query or error to set.
     */
    setQuery(queryOrError: BasesQuery | Error): void;

    /**
     * Sets the query and view.
     *
     * @param queryOrError - The query or error to set.
     * @param viewName - The name of the view to select.
     */
    setQueryAndView(queryOrError: BasesQuery | Error, viewName: string): void;

    /**
     * Starts the loader.
     */
    startLoader(): void;

    /**
     * Stops the loader.
     */
    stopLoader(): void;

    /**
     * Updates the view.
     */
    update(): void;

    /**
     * Updates the current file.
     *
     * @param file - The file to set as current.
     */
    updateCurrentFile(file: TFile): void;
}
