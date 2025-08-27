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
     */
    addResult(result: unknown, arg2: unknown): unknown;

    /**
     * Builds the bases context.
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
     */
    displayError(error: string, arg2: unknown): void;

    /**
     * Evaluates the relevant properties.
     */
    evaluateRelevantProperties(relevantProperties: string[]): void;

    /**
     * Gets the active bases view of a given type.
     */
    getActiveBasesViewOfType(viewType: string): View | null;

    /**
     * Gets the current file.
     */
    getCurrentFile(): TFile | null;

    /**
     * Gets the editor language support.
     */
    getEditorLanguageSupport(): EditorLanguageSupport;

    /**
     * Gets the mock value.
     */
    getMockValue(arg1: unknown): unknown;

    /**
     * Gets the mock value for an ident.
     */
    getMockValueForIdent(arg1: unknown): unknown;

    /**
     * Gets the properties.
     */
    getProperties(): unknown[];

    /**
     * Gets the query view names.
     */
    getQueryViewNames(): string[];

    /**
     * Gets the view config.
     */
    getViewConfig(): unknown;

    /**
     * Gets the widget for an ident.
     */
    getWidgetForIdent(type: string): string;

    /**
     * Notifies the view.
     */
    notifyView(): void;

    /**
     * On config changed.
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
     */
    removeResult(arg1: unknown): unknown;

    /**
     * Runs a query.
     */
    runQuery(arg1: unknown): void;

    /**
     * Selects a view.
     */
    selectView(viewName: string): void;

    /**
     * Sets the query.
     */
    setQuery(queryOrError: BasesQuery | Error): void;

    /**
     * Sets the query and view.
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
     */
    updateCurrentFile(file: TFile): void;
}
