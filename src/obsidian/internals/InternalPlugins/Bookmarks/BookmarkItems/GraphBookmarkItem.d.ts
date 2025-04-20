import type { GraphPluginInstanceOptions } from '../../Graph/GraphPluginInstanceOptions.d.ts';
import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphBookmarkItem extends BookmarkItem {
    options: GraphPluginInstanceOptions;
    title: string;
    type: 'graph';
}
