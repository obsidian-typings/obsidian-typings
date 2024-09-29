import type { App, Menu, TAbstractFile, TFile, WorkspaceLeaf } from 'obsidian';
import type { BacklinkPlugin } from './BacklinkPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BacklinkPluginInstance extends InternalPluginInstance<BacklinkPlugin> {
    app: App;
    defaultOn: boolean;
    file?: TFile | null;
    plugin: BacklinkPlugin;
    options: {
        backlinkInDocument?: boolean;
    };

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
