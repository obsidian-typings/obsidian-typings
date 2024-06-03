import type {
    App,
    TFile,
    TFolder,
    Events
} from "obsidian";
import type { InternalPluginName } from "./index.d.ts";

/** @todo Documentation incomplete */
export default interface InternalPlugin<TInstance extends InternalPluginInstance = InternalPluginInstance> extends Plugin {
    instance: TInstance;

    disable(): void;
    enable(): Promise<void>;
}

export type InternalPluginNameType = typeof InternalPluginName[keyof typeof InternalPluginName];

export interface InternalPluginInstance {
    plugin: InternalPlugin<this>;
}

export type InternalPluginNameInstancesMapping = {
    [InternalPluginName.AudioRecorder]: AudioRecorderPluginInstance;
    [InternalPluginName.Backlink]: BacklinkPluginInstance;
    [InternalPluginName.Bookmarks]: BookmarksPluginInstance;
    [InternalPluginName.Canvas]: CanvasPluginInstance;
    [InternalPluginName.CommandPalette]: CommandPalettePluginInstance;
    [InternalPluginName.DailyNotes]: DailyNotesPluginInstance;
    [InternalPluginName.EditorStatus]: EditorStatusPluginInstance;
    [InternalPluginName.FileExplorer]: FileExplorerPluginInstance;
    [InternalPluginName.FileRecovery]: FileRecoveryPluginInstance;
    [InternalPluginName.GlobalSearch]: GlobalSearchPluginInstance;
    [InternalPluginName.Graph]: GraphPluginInstance;
    [InternalPluginName.MarkdownImporter]: MarkdownImporterPluginInstance;
    [InternalPluginName.NoteComposer]: NoteComposerPluginInstance;
    [InternalPluginName.OutgoingLink]: OutgoingLinkPluginInstance;
    [InternalPluginName.Outline]: OutlinePluginInstance;
    [InternalPluginName.PagePreview]: PagePreviewPluginInstance;
    [InternalPluginName.Properties]: PropertiesPluginInstance;
    [InternalPluginName.Publish]: PublishPluginInstance;
    [InternalPluginName.RandomNote]: RandomNotePluginInstance;
    [InternalPluginName.SlashCommand]: SlashCommandPluginInstance;
    [InternalPluginName.Slides]: SlidesPluginInstance;
    [InternalPluginName.Starred]: StarredPluginInstance;
    [InternalPluginName.Switcher]: SwitcherPluginInstance;
    [InternalPluginName.Sync]: SyncPluginInstance;
    [InternalPluginName.TagPane]: TagPanePluginInstance;
    [InternalPluginName.Templates]: TemplatesPluginInstance;
    [InternalPluginName.WordCount]: WordCountPluginInstance;
    [InternalPluginName.Workspaces]: WorkspacesPluginInstance;
    [InternalPluginName.ZkPrefixer]: ZkPrefixerPluginInstance;
};

export interface AudioRecorderPluginInstance extends InternalPluginInstance { }

export interface BacklinkPluginInstance extends InternalPluginInstance { }

export interface BookmarksPluginInstance extends InternalPluginInstance { }

export interface CanvasPluginInstance extends InternalPluginInstance { }

export interface CommandPalettePluginInstance extends InternalPluginInstance { }

export interface DailyNotesPluginInstance extends InternalPluginInstance { }

export interface EditorStatusPluginInstance extends InternalPluginInstance { }

/** @todo Documentation incomplete */
export interface FileExplorerPluginInstance extends InternalPluginInstance {
    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}

export interface FileRecoveryPluginInstance extends InternalPluginInstance { }

/** @todo Documentation incomplete */
export interface GlobalSearchPluginInstance extends InternalPluginInstance { }

export interface GraphPluginInstance extends InternalPluginInstance { }

export interface MarkdownImporterPluginInstance extends InternalPluginInstance { }

export interface NoteComposerPluginInstance extends InternalPluginInstance { }

export interface OutgoingLinkPluginInstance extends InternalPluginInstance { }

export interface OutlinePluginInstance extends InternalPluginInstance { }

export interface PagePreviewPluginInstance extends InternalPluginInstance { }

export interface PropertiesPluginInstance extends InternalPluginInstance { }

export interface PublishPluginInstance extends InternalPluginInstance { }

export interface RandomNotePluginInstance extends InternalPluginInstance { }

export interface SlashCommandPluginInstance extends InternalPluginInstance { }

export interface SlidesPluginInstance extends InternalPluginInstance { }

export interface StarredPluginInstance extends InternalPluginInstance { }

export interface SwitcherPluginInstance extends InternalPluginInstance { }

export interface SyncPluginInstance extends InternalPluginInstance { }

export interface TagPanePluginInstance extends InternalPluginInstance { }

export interface TemplatesPluginInstance extends InternalPluginInstance { }

export interface WordCountPluginInstance extends InternalPluginInstance { }

export interface WorkspacesPluginInstance extends InternalPluginInstance { }

export interface ZkPrefixerPluginInstance extends InternalPluginInstance { }

export interface InternalPlugins extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Mapping of whether an internal plugin is enabled
     */
    config: Record<InternalPluginNameType, boolean>;
    /** @internal */
    migration: boolean;
    /**
     * Plugin configs for internal plugins
     *
     * @remark Prefer usage of getPluginById to access a plugin
     */
    plugins: {
        [ID in InternalPluginNameType]: InternalPlugin<
            InternalPluginNameInstancesMapping[ID]
        >;
    };

    /** @internal - Load plugin configs and enable plugins */
    enable(): Promise<void>;
    /**
     * Get an enabled internal plugin by ID
     *
     * @param id - ID of the plugin to get
     */
    getEnabledPluginById<ID extends InternalPluginNameType>(
        id: ID
    ): InternalPluginNameInstancesMapping[ID] | null;
    /**
     * Get all enabled internal plugins
     */
    getEnabledPlugins(): InternalPlugin[];
    /**
     * Get an internal plugin by ID
     *
     * @param id - ID of the plugin to get
     */
    getPluginById<ID extends InternalPluginNameType>(
        id: ID
    ): InternalPlugin<InternalPluginNameInstancesMapping[ID]> | null;
    /** @internal */
    loadPlugin(arg: { id: string; name: string; }): string;
    /** @internal */
    onRaw(cb1: unknown, cb2: unknown): void;
    /** @internal Request save of plugin configs */
    requestSaveConfig(): void;
    /** @internal - Save current plugin configs */
    saveConfig(): Promise<void>;
}
