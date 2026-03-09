import { InternalPluginName } from './InternalPluginName.ts';

/**
 * Constant mapping of view type identifiers used to open and manage different leaf views in Obsidian.
 *
 * @public
 * @unofficial
 */
export const ViewType = {
  AllProperties: 'all-properties',
  Audio: 'audio',
  Backlink: InternalPluginName.Backlink,
  Bases: InternalPluginName.Bases,
  Bookmarks: InternalPluginName.Bookmarks,
  Canvas: InternalPluginName.Canvas,
  Empty: 'empty',
  FileExplorer: InternalPluginName.FileExplorer,
  FileProperties: 'file-properties',
  Graph: InternalPluginName.Graph,
  Image: 'image',
  LocalGraph: 'localgraph',
  Markdown: 'markdown',
  OutgoingLink: InternalPluginName.OutgoingLink,
  Outline: InternalPluginName.Outline,
  Pdf: 'pdf',
  ReleaseNotes: 'release-notes',
  Search: 'search',
  Sync: 'sync',
  Table: 'table',
  Tag: 'tag',
  Video: 'video',
  Webviewer: 'webviewer',
  WebviewerHistory: 'webviewer-history'
} as const;
