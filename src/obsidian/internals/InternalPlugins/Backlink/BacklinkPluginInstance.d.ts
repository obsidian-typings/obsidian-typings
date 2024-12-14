import type {
    App,
    Menu,
    TAbstractFile,
    TFile,
    WorkspaceLeaf
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { BacklinkPlugin } from './BacklinkPlugin.js';

/** @public */
export interface BacklinkPluginInstance extends InternalPluginInstance<BacklinkPlugin> {
    app: App;
    defaultOn: true;
    file?: TFile | null;
    options: {
        backlinkInDocument?: boolean;
    };
    plugin: BacklinkPlugin;

    initLeaf(): void;
    onEnable(app: App, plugin: BacklinkPlugin): Promise<void>;
    onExternalSettingsChange(): Promise<void>;
    onFileMenu(menu: Menu, file: TAbstractFile, title: string, leaf?: WorkspaceLeaf): Menu;
    onFileOpen(file: TAbstractFile): void;
    onUserDisable(app: App): void;
    onUserEnable(): void;
    openBacklinksForActiveFile(skipSplit: boolean): boolean | undefined;
    toggleBacklinksInDocument(skip: boolean): boolean | undefined;
    updateBacklinks(): void;
}
