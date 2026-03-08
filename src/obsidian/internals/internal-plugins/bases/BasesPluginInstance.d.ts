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
     *
     * @param editor - The editor to embed the base into.
     * @returns A promise that resolves when the base is created and embedded.
     */
    createAndEmbedBase(editor: Editor): Promise<void>;

    /**
     * Creates a new bases file.
     *
     * @param location - Optional folder location for the new file.
     * @param filename - Optional filename for the new file.
     * @param contents - Optional initial contents.
     * @returns The created file.
     */
    createNewBasesFile(location?: TFolder, filename?: string, contents?: string): Promise<TFile>;

    /**
     * Deregisters a function.
     *
     * @param name - The name of the function to deregister.
     */
    deregisterFunction(name: string): void;

    /**
     * Deregisters a view.
     *
     * @param type - The view type to deregister.
     */
    deregisterView(type: string): void;

    /**
     * Gets a function.
     *
     * @param name - The name of the function to get.
     * @returns The function, or `null` if not found.
     */
    getFunction(name: string): BasesFunction | null;

    /**
     * Gets the operator functions.
     *
     * @returns The list of operator functions.
     */
    getOperatorFunctions(): BasesFunction[];

    /**
     * Gets a view factory.
     *
     * @param type - The view type to get the factory for.
     * @returns The view factory, or `null` if not found.
     */
    getViewFactory(type: string): ViewFactory | null;

    /**
     * Gets the view types.
     *
     * @returns The list of registered view type strings.
     */
    getViewTypes(): string[];

    /**
     * On file menu.
     *
     * @param menu - The context menu to extend.
     * @param file - The target file or folder.
     * @param source - The source of the context menu event.
     * @param leaf - Optional workspace leaf context.
     */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /**
     * Registers a function.
     *
     * @param fn - The function to register.
     */
    registerFunction(fn: BasesFunction): void;

    /**
     * Registers a view.
     *
     * @param type - The view type identifier.
     * @param viewFactory - The factory function to create the view.
     */
    registerView(type: string, viewFactory: ViewFactory): void;
}
