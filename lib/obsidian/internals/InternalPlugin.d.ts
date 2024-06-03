import InternalPluginName from "./InternalPluginName.ts";
import type Events from "../Events.d.ts";
import type TFile from "../TFile.d.ts";
import type TFolder from "../TFolder.d.ts";
import type Plugin from "../Plugin.d.ts";

export type InternalPluginName = typeof InternalPluginName[keyof typeof InternalPluginName];

export interface InternalPluginInstance {
    plugin: InternalPlugin<this>;
}

/** @todo Documentation incomplete */
interface InternalPlugin<TInstance extends InternalPluginInstance = InternalPluginInstance> extends Plugin {
    instance: TInstance;

    disable(): void;
    enable(): Promise<void>;
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

interface AudioRecorderPluginInstance extends InternalPluginInstance { }

interface BacklinkPluginInstance extends InternalPluginInstance { }

interface BookmarksPluginInstance extends InternalPluginInstance { }

interface CanvasPluginInstance extends InternalPluginInstance { }

interface CommandPalettePluginInstance extends InternalPluginInstance { }

interface DailyNotesPluginInstance extends InternalPluginInstance { }

interface EditorStatusPluginInstance extends InternalPluginInstance { }

/** @todo Documentation incomplete */
interface FileExplorerPluginInstance extends InternalPluginInstance {
    /**
     * Reveals a file or folder in the file explorer view, opens the view if it is not already
     * open/visible
     */
    revealInFolder(item: TFile | TFolder): void;
}

interface FileRecoveryPluginInstance extends InternalPluginInstance { }

/** @todo Documentation incomplete */
interface GlobalSearchPluginInstance extends InternalPluginInstance { }

interface GraphPluginInstance extends InternalPluginInstance { }

interface MarkdownImporterPluginInstance extends InternalPluginInstance { }

interface NoteComposerPluginInstance extends InternalPluginInstance { }

interface OutgoingLinkPluginInstance extends InternalPluginInstance { }

interface OutlinePluginInstance extends InternalPluginInstance { }

interface PagePreviewPluginInstance extends InternalPluginInstance { }

interface PropertiesPluginInstance extends InternalPluginInstance { }

interface PublishPluginInstance extends InternalPluginInstance { }

interface RandomNotePluginInstance extends InternalPluginInstance { }

interface SlashCommandPluginInstance extends InternalPluginInstance { }

interface SlidesPluginInstance extends InternalPluginInstance { }

interface StarredPluginInstance extends InternalPluginInstance { }

interface SwitcherPluginInstance extends InternalPluginInstance { }

interface SyncPluginInstance extends InternalPluginInstance { }

interface TagPanePluginInstance extends InternalPluginInstance { }

interface TemplatesPluginInstance extends InternalPluginInstance { }

interface WordCountPluginInstance extends InternalPluginInstance { }

interface WorkspacesPluginInstance extends InternalPluginInstance { }

interface ZkPrefixerPluginInstance extends InternalPluginInstance { }

interface InternalPlugins extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Mapping of whether an internal plugin is enabled
     */
    config: Record<InternalPluginName, boolean>;
    /** @internal */
    migration: boolean;
    /**
     * Plugin configs for internal plugins
     *
     * @remark Prefer usage of getPluginById to access a plugin
     */
    plugins: {
        [ID in InternalPluginName]: InternalPlugin<
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
    getEnabledPluginById<ID extends InternalPluginName>(
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
    getPluginById<ID extends InternalPluginName>(
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
