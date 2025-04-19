import { InternalPluginName } from './InternalPluginName.ts';

/** @public @unofficial */
export const ViewType = {
    AllProperties: 'all-properties',
    Audio: 'audio',
    Backlink: InternalPluginName.Backlink,
    Bookmarks: InternalPluginName.Bookmarks,
    Browser: 'browser',
    BrowserHistory: 'browser-history',
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
    Tag: 'tag',
    Video: 'video'
} as const;
