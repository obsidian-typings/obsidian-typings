import type {
    App,
    Menu,
    TAbstractFile,
    TFile,
    WorkspaceLeaf
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BacklinkPlugin } from './BacklinkPlugin.d.ts';
import type { BacklinkPluginInstanceOptions } from './BacklinkPluginInstanceOptions.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface BacklinkPluginInstance extends InternalPluginInstance<BacklinkPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    file?: TFile | null;

    /** @todo Documentation incomplete. */
    options: BacklinkPluginInstanceOptions;

    /** @todo Documentation incomplete. */
    plugin: BacklinkPlugin;

    /** @todo Documentation incomplete. */
    initLeaf(): void;

    /** @todo Documentation incomplete. */
    onEnable(app: App, plugin: BacklinkPlugin): Promise<void>;

    /** @todo Documentation incomplete. */
    onExternalSettingsChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

    /** @todo Documentation incomplete. */
    onFileOpen(file: TAbstractFile): void;

    /** @todo Documentation incomplete. */
    onUserDisable(app: App): void;

    /** @todo Documentation incomplete. */
    onUserEnable(): void;

    /** @todo Documentation incomplete. */
    openBacklinksForActiveFile(skipSplit: boolean): boolean | undefined;

    /** @todo Documentation incomplete. */
    toggleBacklinksInDocument(skip: boolean): boolean | undefined;

    /** @todo Documentation incomplete. */
    updateBacklinks(): void;
}
