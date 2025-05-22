import type { ViewType } from '../../implementations/Constants/ViewType.ts';
import type { BacklinkViewConstructor } from '../InternalPlugins/Backlink/BacklinkViewConstructor.d.ts';
import type { BookmarksViewConstructor } from '../InternalPlugins/Bookmarks/BookmarksViewConstructor.d.ts';
import type { WebviewerHistoryViewConstructor } from '../InternalPlugins/Webviewer/WebviewerHistoryViewConstructor.d.ts';
import type { WebviewerViewConstructor } from '../InternalPlugins/Webviewer/WebviewerViewConstructor.d.ts';
import type { CanvasViewConstructor } from '../InternalPlugins/Canvas/CanvasViewConstructor.d.ts';
import type { FileExplorerViewConstructor } from '../InternalPlugins/FileExplorer/FileExplorerViewConstructor.d.ts';
import type { SearchViewConstructor } from '../InternalPlugins/GlobalSearch/SearchViewConstructor.d.ts';
import type { GraphViewConstructor } from '../InternalPlugins/Graph/GraphViewConstructor.d.ts';
import type { LocalGraphViewConstructor } from '../InternalPlugins/Graph/LocalGraphViewConstructor.d.ts';
import type { OutgoingLinkViewConstructor } from '../InternalPlugins/OutgoingLink/OutgoingLinkViewConstructor.d.ts';
import type { OutlineViewConstructor } from '../InternalPlugins/Outline/OutlineViewConstructor.d.ts';
import type { AllPropertiesViewConstructor } from '../InternalPlugins/Properties/AllPropertiesViewConstructor.d.ts';
import type { FilePropertiesViewConstructor } from '../InternalPlugins/Properties/FilePropertiesViewConstructor.d.ts';
import type { SyncViewConstructor } from '../InternalPlugins/Sync/SyncViewConstructor.d.ts';
import type { AudioViewConstructor } from './AudioViewConstructor.d.ts';
import type { EmptyViewConstructor } from './EmptyViewConstructor.d.ts';
import type { ImageViewConstructor } from './ImageViewConstructor.d.ts';
import type { MarkdownViewConstructor } from './MarkdownViewConstructor.d.ts';
import type { PdfViewConstructor } from './PdfViewConstructor.d.ts';
import type { ReleaseNotesViewConstructor } from './ReleaseNotesViewConstructor.d.ts';
import type { TagViewConstructor } from './TagViewConstructor.d.ts';
import type { VideoViewConstructor } from './VideoViewConstructor.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export type ViewTypeViewConstructorMapping = {
    [ViewType.AllProperties]: AllPropertiesViewConstructor;
    [ViewType.Audio]: AudioViewConstructor;
    [ViewType.Backlink]: BacklinkViewConstructor;
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
    [ViewType.Tag]: TagViewConstructor;
    [ViewType.Video]: VideoViewConstructor;
};
