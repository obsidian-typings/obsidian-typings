import type { MarkdownView } from 'obsidian';
import type { ViewType } from '../../implementations/constants/ViewType.d.ts';
import type { BacklinkView } from '../internal-plugins/backlink/BacklinkView.d.ts';
import type { BasesView } from '../internal-plugins/bases/BasesView.d.ts';
import type { TableView } from '../internal-plugins/bases/TableView.d.ts';
import type { BookmarksView } from '../internal-plugins/bookmarks/BookmarksView.d.ts';
import type { CanvasView } from '../internal-plugins/canvas/CanvasView.d.ts';
import type { FileExplorerView } from '../internal-plugins/file-explorer/FileExplorerView.d.ts';
import type { SearchView } from '../internal-plugins/global-search/SearchView.d.ts';
import type { GraphView } from '../internal-plugins/graph/GraphView.d.ts';
import type { LocalGraphView } from '../internal-plugins/graph/LocalGraphView.d.ts';
import type { OutgoingLinkView } from '../internal-plugins/outgoing-link/OutgoingLinkView.d.ts';
import type { OutlineView } from '../internal-plugins/outline/OutlineView.d.ts';
import type { AllPropertiesView } from '../internal-plugins/properties/AllPropertiesView.d.ts';
import type { FilePropertiesView } from '../internal-plugins/properties/FilePropertiesView.d.ts';
import type { SyncView } from '../internal-plugins/sync/SyncView.d.ts';
import type { WebviewerHistoryView } from '../internal-plugins/webviewer/WebviewerHistoryView.d.ts';
import type { WebviewerView } from '../internal-plugins/webviewer/WebviewerView.d.ts';
import type { AudioView } from './AudioView.d.ts';
import type { EmptyView } from './EmptyView.d.ts';
import type { ImageView } from './ImageView.d.ts';
import type { PdfView } from './PdfView.d.ts';
import type { ReleaseNotesView } from './ReleaseNotesView.d.ts';
import type { TagView } from './TagView.d.ts';
import type { VideoView } from './VideoView.d.ts';

/**
 * Mapping from view type identifiers to their corresponding view instance types.
 *
 * @public
 * @unofficial
 */
export type ViewTypeViewMapping = {
    [ViewType.AllProperties]: AllPropertiesView;
    [ViewType.Audio]: AudioView;
    [ViewType.Backlink]: BacklinkView;
    [ViewType.Bases]: BasesView;
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
    [ViewType.Table]: TableView;
    [ViewType.Tag]: TagView;
    [ViewType.Video]: VideoView;
};
