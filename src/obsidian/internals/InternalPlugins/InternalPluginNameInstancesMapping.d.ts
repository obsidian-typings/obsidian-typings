import type { InternalPluginName } from '../../implementations/Constants/InternalPluginName.d.ts';
import type { AudioRecorderPluginInstance } from './AudioRecorder/AudioRecorderPluginInstance.d.ts';
import type { BacklinkPluginInstance } from './Backlink/BacklinkPluginInstance.d.ts';
import type { BasesPluginInstance } from './Bases/BasesPluginInstance.d.ts';
import type { BookmarksPluginInstance } from './Bookmarks/BookmarksPluginInstance.d.ts';
import type { CanvasPluginInstance } from './Canvas/CanvasPluginInstance.d.ts';
import type { CommandPalettePluginInstance } from './CommandPalette/CommandPalettePluginInstance.d.ts';
import type { DailyNotesPluginInstance } from './DailyNotes/DailyNotesPluginInstance.d.ts';
import type { EditorStatusPluginInstance } from './EditorStatus/EditorStatusPluginInstance.d.ts';
import type { FileExplorerPluginInstance } from './FileExplorer/FileExplorerPluginInstance.d.ts';
import type { FileRecoveryPluginInstance } from './FileRecovery/FileRecoveryPluginInstance.d.ts';
import type { FootnotesPluginInstance } from './Footnotes/FootnotesPluginInstance.d.ts';
import type { GlobalSearchPluginInstance } from './GlobalSearch/GlobalSearchPluginInstance.d.ts';
import type { GraphPluginInstance } from './Graph/GraphPluginInstance.d.ts';
import type { MarkdownImporterPluginInstance } from './MarkdownImporter/MarkdownImporterPluginInstance.d.ts';
import type { NoteComposerPluginInstance } from './NoteComposer/NoteComposerPluginInstance.d.ts';
import type { OutgoingLinkPluginInstance } from './OutgoingLink/OutgoingLinkPluginInstance.d.ts';
import type { OutlinePluginInstance } from './Outline/OutlinePluginInstance.d.ts';
import type { PagePreviewPluginInstance } from './PagePreview/PagePreviewPluginInstance.d.ts';
import type { PropertiesPluginInstance } from './Properties/PropertiesPluginInstance.d.ts';
import type { PublishPluginInstance } from './Publish/PublishPluginInstance.d.ts';
import type { RandomNotePluginInstance } from './RandomNote/RandomNotePluginInstance.d.ts';
import type { SlashCommandPluginInstance } from './SlashCommand/SlashCommandPluginInstance.d.ts';
import type { SlidesPluginInstance } from './Slides/SlidesPluginInstance.d.ts';
import type { SwitcherPluginInstance } from './Switcher/SwitcherPluginInstance.d.ts';
import type { SyncPluginInstance } from './Sync/SyncPluginInstance.d.ts';
import type { TagPanePluginInstance } from './TagPane/TagPanePluginInstance.d.ts';
import type { TemplatesPluginInstance } from './Templates/TemplatesPluginInstance.d.ts';
import type { WebviewerPluginInstance } from './Webviewer/WebviewerPluginInstance.d.ts';
import type { WordCountPluginInstance } from './WordCount/WordCountPluginInstance.d.ts';
import type { WorkspacesPluginInstance } from './Workspaces/WorkspacesPluginInstance.d.ts';
import type { ZkPrefixerPluginInstance } from './ZkPrefixer/ZkPrefixerPluginInstance.d.ts';

/**
 * @todo Documentation incomplete.
 *
 * @public
 * @unofficial
 */
export type InternalPluginNameInstancesMapping = {
    [InternalPluginName.AudioRecorder]: AudioRecorderPluginInstance;
    [InternalPluginName.Backlink]: BacklinkPluginInstance;
    [InternalPluginName.Bases]: BasesPluginInstance;
    [InternalPluginName.Bookmarks]: BookmarksPluginInstance;
    [InternalPluginName.Webviewer]: WebviewerPluginInstance;
    [InternalPluginName.Canvas]: CanvasPluginInstance;
    [InternalPluginName.CommandPalette]: CommandPalettePluginInstance;
    [InternalPluginName.DailyNotes]: DailyNotesPluginInstance;
    [InternalPluginName.EditorStatus]: EditorStatusPluginInstance;
    [InternalPluginName.FileExplorer]: FileExplorerPluginInstance;
    [InternalPluginName.FileRecovery]: FileRecoveryPluginInstance;
    [InternalPluginName.Footnotes]: FootnotesPluginInstance;
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
    [InternalPluginName.Switcher]: SwitcherPluginInstance;
    [InternalPluginName.Sync]: SyncPluginInstance;
    [InternalPluginName.TagPane]: TagPanePluginInstance;
    [InternalPluginName.Templates]: TemplatesPluginInstance;
    [InternalPluginName.WordCount]: WordCountPluginInstance;
    [InternalPluginName.Workspaces]: WorkspacesPluginInstance;
    [InternalPluginName.ZkPrefixer]: ZkPrefixerPluginInstance;
};
