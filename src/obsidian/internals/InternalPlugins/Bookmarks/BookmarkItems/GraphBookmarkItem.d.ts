import type { GraphPluginInstanceOptions } from '../../Graph/GraphPluginInstanceOptions.js';
import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface GraphBookmarkItem extends BookmarkItem {
    options: GraphPluginInstanceOptions;
    title: string;
    type: 'graph';
}
