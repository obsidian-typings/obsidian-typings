import type { InternalPluginName } from '../../implementations/constants/InternalPluginName.d.ts';
import type { AudioRecorderPluginInstance } from './audio-recorder/AudioRecorderPluginInstance.d.ts';
import type { BacklinkPluginInstance } from './backlink/BacklinkPluginInstance.d.ts';
import type { BasesPluginInstance } from './bases/BasesPluginInstance.d.ts';
import type { BookmarksPluginInstance } from './bookmarks/BookmarksPluginInstance.d.ts';
import type { CanvasPluginInstance } from './canvas/CanvasPluginInstance.d.ts';
import type { CommandPalettePluginInstance } from './command-palette/CommandPalettePluginInstance.d.ts';
import type { DailyNotesPluginInstance } from './daily-notes/DailyNotesPluginInstance.d.ts';
import type { EditorStatusPluginInstance } from './editor-status/EditorStatusPluginInstance.d.ts';
import type { FileExplorerPluginInstance } from './file-explorer/FileExplorerPluginInstance.d.ts';
import type { FileRecoveryPluginInstance } from './file-recovery/FileRecoveryPluginInstance.d.ts';
import type { FootnotesPluginInstance } from './footnotes/FootnotesPluginInstance.d.ts';
import type { GlobalSearchPluginInstance } from './global-search/GlobalSearchPluginInstance.d.ts';
import type { GraphPluginInstance } from './graph/GraphPluginInstance.d.ts';
import type { MarkdownImporterPluginInstance } from './markdown-importer/MarkdownImporterPluginInstance.d.ts';
import type { NoteComposerPluginInstance } from './note-composer/NoteComposerPluginInstance.d.ts';
import type { OutgoingLinkPluginInstance } from './outgoing-link/OutgoingLinkPluginInstance.d.ts';
import type { OutlinePluginInstance } from './outline/OutlinePluginInstance.d.ts';
import type { PagePreviewPluginInstance } from './page-preview/PagePreviewPluginInstance.d.ts';
import type { PropertiesPluginInstance } from './properties/PropertiesPluginInstance.d.ts';
import type { PublishPluginInstance } from './publish/PublishPluginInstance.d.ts';
import type { RandomNotePluginInstance } from './random-note/RandomNotePluginInstance.d.ts';
import type { SlashCommandPluginInstance } from './slash-command/SlashCommandPluginInstance.d.ts';
import type { SlidesPluginInstance } from './slides/SlidesPluginInstance.d.ts';
import type { SwitcherPluginInstance } from './switcher/SwitcherPluginInstance.d.ts';
import type { SyncPluginInstance } from './sync/SyncPluginInstance.d.ts';
import type { TagPanePluginInstance } from './tag-pane/TagPanePluginInstance.d.ts';
import type { TemplatesPluginInstance } from './templates/TemplatesPluginInstance.d.ts';
import type { WebviewerPluginInstance } from './webviewer/WebviewerPluginInstance.d.ts';
import type { WordCountPluginInstance } from './word-count/WordCountPluginInstance.d.ts';
import type { WorkspacesPluginInstance } from './workspaces/WorkspacesPluginInstance.d.ts';
import type { ZkPrefixerPluginInstance } from './zk-prefixer/ZkPrefixerPluginInstance.d.ts';

/**
 * Mapping from internal plugin name to its corresponding plugin instance type.
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
