import type { MarkdownView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';
import type { BacklinkView } from '../InternalPlugins/Backlink/BacklinkView.d.ts';
import type { BookmarksView } from '../InternalPlugins/Bookmarks/BookmarksView.d.ts';
import type { CanvasView } from '../InternalPlugins/Canvas/CanvasView.d.ts';
import type { FileExplorerView } from '../InternalPlugins/FileExplorer/FileExplorerView.d.ts';
import type { SearchView } from '../InternalPlugins/GlobalSearch/SearchView.d.ts';
import type { GraphView } from '../InternalPlugins/Graph/GraphView.d.ts';
import type { LocalGraphView } from '../InternalPlugins/Graph/LocalGraphView.d.ts';
import type { OutgoingLinkView } from '../InternalPlugins/OutgoingLink/OutgoingLinkView.d.ts';
import type { OutlineView } from '../InternalPlugins/Outline/OutlineView.d.ts';
import type { AllPropertiesView } from '../InternalPlugins/Properties/AllPropertiesView.d.ts';
import type { FilePropertiesView } from '../InternalPlugins/Properties/FilePropertiesView.d.ts';
import type { SyncView } from '../InternalPlugins/Sync/SyncView.d.ts';
import type { WebviewerHistoryView } from '../InternalPlugins/Webviewer/WebviewerHistoryView.d.ts';
import type { WebviewerView } from '../InternalPlugins/Webviewer/WebviewerView.d.ts';
import type { AudioView } from './AudioView.d.ts';
import type { EmptyView } from './EmptyView.d.ts';
import type { ImageView } from './ImageView.d.ts';
import type { PdfView } from './PdfView.d.ts';
import type { ReleaseNotesView } from './ReleaseNotesView.d.ts';
import type { TagView } from './TagView.d.ts';
import type { VideoView } from './VideoView.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export type ViewTypeViewMapping = {
    [ViewType.AllProperties]: AllPropertiesView;
    [ViewType.Audio]: AudioView;
    [ViewType.Backlink]: BacklinkView;
    [ViewType.Bookmarks]: BookmarksView;
    [ViewType.Webviewer]: WebviewerView;
    [ViewType.WebviewerHistory]: WebviewerHistoryView;
    [ViewType.Canvas]: CanvasView;
    [ViewType.Empty]: EmptyView;
    [ViewType.FileExplorer]: FileExplorerView;
    [ViewType.FileProperties]: FilePropertiesView;
    [ViewType.Graph]: GraphView;
    [ViewType.Image]: ImageView;
    [ViewType.LocalGraph]: LocalGraphView;
    [ViewType.Markdown]: MarkdownView;
    [ViewType.OutgoingLink]: OutgoingLinkView;
    [ViewType.Outline]: OutlineView;
    [ViewType.Pdf]: PdfView;
    [ViewType.ReleaseNotes]: ReleaseNotesView;
    [ViewType.Search]: SearchView;
    [ViewType.Sync]: SyncView;
    [ViewType.Tag]: TagView;
    [ViewType.Video]: VideoView;
};
