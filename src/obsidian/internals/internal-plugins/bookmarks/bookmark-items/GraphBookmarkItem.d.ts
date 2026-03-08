import type { GraphPluginInstanceOptions } from '../../graph/GraphPluginInstanceOptions.d.ts';
import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a saved graph view configuration.
 * @public
 * @unofficial
 */
export interface GraphBookmarkItem extends BookmarkItem {
    /** Graph view options saved with this bookmark. */
    options: GraphPluginInstanceOptions;

    /** Display title of this graph bookmark. */
    title: string;

    /** Discriminator indicating this is a graph bookmark. */
    type: 'graph';
}
