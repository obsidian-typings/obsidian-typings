import type { InternalPluginName } from '../../implementations/constants/InternalPluginName.d.ts';
import type { AudioRecorderPlugin } from './audio-recorder/AudioRecorderPlugin.d.ts';
import type { BacklinkPlugin } from './backlink/BacklinkPlugin.d.ts';
import type { BasesPlugin } from './bases/BasesPlugin.d.ts';
import type { BookmarksPlugin } from './bookmarks/BookmarksPlugin.d.ts';
import type { CanvasPlugin } from './canvas/CanvasPlugin.d.ts';
import type { CommandPalettePlugin } from './command-palette/CommandPalettePlugin.d.ts';
import type { DailyNotesPlugin } from './daily-notes/DailyNotesPlugin.d.ts';
import type { EditorStatusPlugin } from './editor-status/EditorStatusPlugin.d.ts';
import type { FileExplorerPlugin } from './file-explorer/FileExplorerPlugin.d.ts';
import type { FileRecoveryPlugin } from './file-recovery/FileRecoveryPlugin.d.ts';
import type { FootnotesPlugin } from './footnotes/FootnotesPlugin.d.ts';
import type { GlobalSearchPlugin } from './global-search/GlobalSearchPlugin.d.ts';
import type { GraphPlugin } from './graph/GraphPlugin.d.ts';
import type { MarkdownImporterPlugin } from './markdown-importer/MarkdownImporterPlugin.d.ts';
import type { NoteComposerPlugin } from './note-composer/NoteComposerPlugin.d.ts';
import type { OutgoingLinkPlugin } from './outgoing-link/OutgoingLinkPlugin.d.ts';
import type { OutlinePlugin } from './outline/OutlinePlugin.d.ts';
import type { PagePreviewPlugin } from './page-preview/PagePreviewPlugin.d.ts';
import type { PropertiesPlugin } from './properties/PropertiesPlugin.d.ts';
import type { PublishPlugin } from './publish/PublishPlugin.d.ts';
import type { RandomNotePlugin } from './random-note/RandomNotePlugin.d.ts';
import type { SlashCommandPlugin } from './slash-command/SlashCommandPlugin.d.ts';
import type { SlidesPlugin } from './slides/SlidesPlugin.d.ts';
import type { SwitcherPlugin } from './switcher/SwitcherPlugin.d.ts';
import type { SyncPlugin } from './sync/SyncPlugin.d.ts';
import type { TagPanePlugin } from './tag-pane/TagPanePlugin.d.ts';
import type { TemplatesPlugin } from './templates/TemplatesPlugin.d.ts';
import type { WebviewerPlugin } from './webviewer/WebviewerPlugin.d.ts';
import type { WordCountPlugin } from './word-count/WordCountPlugin.d.ts';
import type { WorkspacesPlugin } from './workspaces/WorkspacesPlugin.d.ts';
import type { ZkPrefixerPlugin } from './zk-prefixer/ZkPrefixerPlugin.d.ts';

/**
 * Mapping from internal plugin name to its corresponding plugin registration type.
 *
 * @public
 * @unofficial
 */
export type InternalPluginNamePluginsMapping = {
  [InternalPluginName.AudioRecorder]: AudioRecorderPlugin;
  [InternalPluginName.Backlink]: BacklinkPlugin;
  [InternalPluginName.Bases]: BasesPlugin;
  [InternalPluginName.Bookmarks]: BookmarksPlugin;
  [InternalPluginName.Webviewer]: WebviewerPlugin;
  [InternalPluginName.Canvas]: CanvasPlugin;
  [InternalPluginName.CommandPalette]: CommandPalettePlugin;
  [InternalPluginName.DailyNotes]: DailyNotesPlugin;
  [InternalPluginName.EditorStatus]: EditorStatusPlugin;
  [InternalPluginName.FileExplorer]: FileExplorerPlugin;
  [InternalPluginName.FileRecovery]: FileRecoveryPlugin;
  [InternalPluginName.Footnotes]: FootnotesPlugin;
  [InternalPluginName.GlobalSearch]: GlobalSearchPlugin;
  [InternalPluginName.Graph]: GraphPlugin;
  [InternalPluginName.MarkdownImporter]: MarkdownImporterPlugin;
  [InternalPluginName.NoteComposer]: NoteComposerPlugin;
  [InternalPluginName.OutgoingLink]: OutgoingLinkPlugin;
  [InternalPluginName.Outline]: OutlinePlugin;
  [InternalPluginName.PagePreview]: PagePreviewPlugin;
  [InternalPluginName.Properties]: PropertiesPlugin;
  [InternalPluginName.Publish]: PublishPlugin;
  [InternalPluginName.RandomNote]: RandomNotePlugin;
  [InternalPluginName.SlashCommand]: SlashCommandPlugin;
  [InternalPluginName.Slides]: SlidesPlugin;
  [InternalPluginName.Switcher]: SwitcherPlugin;
  [InternalPluginName.Sync]: SyncPlugin;
  [InternalPluginName.TagPane]: TagPanePlugin;
  [InternalPluginName.Templates]: TemplatesPlugin;
  [InternalPluginName.WordCount]: WordCountPlugin;
  [InternalPluginName.Workspaces]: WorkspacesPlugin;
  [InternalPluginName.ZkPrefixer]: ZkPrefixerPlugin;
};
