import type {
    App,
    Editor,
    Menu,
    TAbstractFile,
    TFile,
    TFolder,
    WorkspaceLeaf
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BasesFunction } from './BasesFunction.d.ts';
import type { BasesFunctions } from './BasesFunctions.d.ts';
import type { BasesHandlers } from './BasesHandlers.d.ts';
import type { BasesPlugin } from './BasesPlugin.d.ts';
import type { ViewFactory } from './ViewFactory.d.ts';

/**
 * Bases plugin instance.
 *
 * @public
 * @unofficial
 */
export interface BasesPluginInstance extends InternalPluginInstance<BasesPlugin> {
    /**
     * An Obsidian app instance.
     */
    app: App;

    /**
     * Whether the default on.
     */
    defaultOn: boolean;

    /**
     * The functions.
     */
    functions: BasesFunctions;

    /**
     * The handlers.
     */
    handlers: BasesHandlers;

    /**
     * Creates and embeds a base.
     */
    createAndEmbedBase(editor: Editor): Promise<void>;

    /**
     * Creates a new bases file.
     */
    createNewBasesFile(location?: TFolder, filename?: string, contents?: string): Promise<TFile>;

    /**
     * Deregisters a function.
     */
    deregisterFunction(name: string): void;

    /**
     * Deregisters a view.
     */
    deregisterView(type: string): void;

    /**
     * Gets a function.
     */
    getFunction(name: string): BasesFunction | null;

    /**
     * Gets the operator functions.
     */
    getOperatorFunctions(): BasesFunction[];

    /**
     * Gets a view factory.
     */
    getViewFactory(type: string): ViewFactory | null;

    /**
     * Gets the view types.
     */
    getViewTypes(): string[];

    /**
     * On file menu.
     */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /**
     * Registers a function.
     */
    registerFunction(fn: BasesFunction): void;

    /**
     * Registers a view.
     */
    registerView(type: string, viewFactory: ViewFactory): void;
}
