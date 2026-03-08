import type { ViewType } from '../../implementations/constants/ViewType.d.ts';
import type { BacklinkViewConstructor } from '../internal-plugins/backlink/BacklinkViewConstructor.d.ts';
import type { BasesViewConstructor } from '../internal-plugins/bases/BasesViewConstructor.d.ts';
import type { TableViewConstructor } from '../internal-plugins/bases/TableViewConstructor.d.ts';
import type { BookmarksViewConstructor } from '../internal-plugins/bookmarks/BookmarksViewConstructor.d.ts';
import type { CanvasViewConstructor } from '../internal-plugins/canvas/CanvasViewConstructor.d.ts';
import type { FileExplorerViewConstructor } from '../internal-plugins/file-explorer/FileExplorerViewConstructor.d.ts';
import type { SearchViewConstructor } from '../internal-plugins/global-search/SearchViewConstructor.d.ts';
import type { GraphViewConstructor } from '../internal-plugins/graph/GraphViewConstructor.d.ts';
import type { LocalGraphViewConstructor } from '../internal-plugins/graph/LocalGraphViewConstructor.d.ts';
import type { OutgoingLinkViewConstructor } from '../internal-plugins/outgoing-link/OutgoingLinkViewConstructor.d.ts';
import type { OutlineViewConstructor } from '../internal-plugins/outline/OutlineViewConstructor.d.ts';
import type { AllPropertiesViewConstructor } from '../internal-plugins/properties/AllPropertiesViewConstructor.d.ts';
import type { FilePropertiesViewConstructor } from '../internal-plugins/properties/FilePropertiesViewConstructor.d.ts';
import type { SyncViewConstructor } from '../internal-plugins/sync/SyncViewConstructor.d.ts';
import type {
    WebviewerHistoryViewConstructor
} from '../internal-plugins/webviewer/WebviewerHistoryViewConstructor.d.ts';
import type { WebviewerViewConstructor } from '../internal-plugins/webviewer/WebviewerViewConstructor.d.ts';
import type { AudioViewConstructor } from './AudioViewConstructor.d.ts';
import type { EmptyViewConstructor } from './EmptyViewConstructor.d.ts';
import type { ImageViewConstructor } from './ImageViewConstructor.d.ts';
import type { MarkdownViewConstructor } from './MarkdownViewConstructor.d.ts';
import type { PdfViewConstructor } from './PdfViewConstructor.d.ts';
import type { ReleaseNotesViewConstructor } from './ReleaseNotesViewConstructor.d.ts';
import type { TagViewConstructor } from './TagViewConstructor.d.ts';
import type { VideoViewConstructor } from './VideoViewConstructor.d.ts';

/**
 * Mapping from view type identifiers to their corresponding view constructor types.
 *
 * @public
 * @unofficial
 */
export type ViewTypeViewConstructorMapping = {
    [ViewType.AllProperties]: AllPropertiesViewConstructor;
    [ViewType.Audio]: AudioViewConstructor;
    [ViewType.Backlink]: BacklinkViewConstructor;
    [ViewType.Bases]: BasesViewConstructor;
    [ViewType.Bookmarks]: BookmarksViewConstructor;
    [ViewType.Webviewer]: WebviewerViewConstructor;
    [ViewType.WebviewerHistory]: WebviewerHistoryViewConstructor;
    [ViewType.Canvas]: CanvasViewConstructor;
    [ViewType.Empty]: EmptyViewConstructor;
    [ViewType.FileExplorer]: FileExplorerViewConstructor;
    [ViewType.FileProperties]: FilePropertiesViewConstructor;
    [ViewType.Graph]: GraphViewConstructor;
    [ViewType.Image]: ImageViewConstructor;
    [ViewType.LocalGraph]: LocalGraphViewConstructor;
    [ViewType.Markdown]: MarkdownViewConstructor;
    [ViewType.OutgoingLink]: OutgoingLinkViewConstructor;
    [ViewType.Outline]: OutlineViewConstructor;
    [ViewType.Pdf]: PdfViewConstructor;
    [ViewType.ReleaseNotes]: ReleaseNotesViewConstructor;
    [ViewType.Search]: SearchViewConstructor;
    [ViewType.Sync]: SyncViewConstructor;
    [ViewType.Table]: TableViewConstructor;
    [ViewType.Tag]: TagViewConstructor;
    [ViewType.Video]: VideoViewConstructor;
};
