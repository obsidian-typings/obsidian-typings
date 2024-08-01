import type { InternalPluginName } from "../../implementations/index.ts";
import type {
    AudioRecorderPluginInstance,
    BacklinkPluginInstance,
    BookmarksPluginInstance,
    CanvasPluginInstance,
    CommandPalettePluginInstance,
    DailyNotesPluginInstance,
    EditorStatusPluginInstance,
    FileExplorerPluginInstance,
    FileRecoveryPluginInstance,
    GlobalSearchPluginInstance,
    GraphPluginInstance,
    MarkdownImporterPluginInstance,
    NoteComposerPluginInstance,
    OutgoingLinkPluginInstance,
    OutlinePluginInstance,
    PagePreviewPluginInstance,
    PropertiesPluginInstance,
    PublishPluginInstance,
    RandomNotePluginInstance,
    SlashCommandPluginInstance,
    SlidesPluginInstance,
    StarredPluginInstance,
    SwitcherPluginInstance,
    SyncPluginInstance,
    TagPanePluginInstance,
    TemplatesPluginInstance,
    WordCountPluginInstance,
    WorkspacesPluginInstance,
    ZkPrefixerPluginInstance
} from "./index.js";

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
