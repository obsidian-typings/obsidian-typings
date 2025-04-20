import type { GraphPluginInstanceOptions } from '../../Graph/GraphPluginInstanceOptions.d.ts';
import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphBookmarkItem extends BookmarkItem {
    /**
     * @todo Documentation incomplete.
     */
    options: GraphPluginInstanceOptions;

    /**
     * @todo Documentation incomplete.
     */
    title: string;

    /**
     * @todo Documentation incomplete.
     */
    type: 'graph';
}
