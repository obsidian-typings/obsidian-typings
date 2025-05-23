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
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface BasesPluginInstance extends InternalPluginInstance<BasesPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: boolean;

    /** @todo Documentation incomplete. */
    functions: BasesFunctions;

    /** @todo Documentation incomplete. */
    handlers: BasesHandlers;

    /** @todo Documentation incomplete. */
    createAndEmbedBase(editor: Editor): Promise<void>;

    /** @todo Documentation incomplete. */
    createNewBasesFile(location?: TFolder, filename?: string, contents?: string): Promise<TFile>;

    /** @todo Documentation incomplete. */
    deregisterFunction(name: string): void;

    /** @todo Documentation incomplete. */
    deregisterView(type: string): void;

    /** @todo Documentation incomplete. */
    getFunction(name: string): BasesFunction | null;

    /** @todo Documentation incomplete. */
    getOperatorFunctions(): BasesFunction[];

    /** @todo Documentation incomplete. */
    getViewFactory(type: string): ViewFactory | null;

    /** @todo Documentation incomplete. */
    getViewTypes(): string[];

    /** @todo Documentation incomplete. */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /** @todo Documentation incomplete. */
    registerFunction(fn: BasesFunction): void;

    /** @todo Documentation incomplete. */
    registerView(type: string, viewFactory: ViewFactory): void;
}
