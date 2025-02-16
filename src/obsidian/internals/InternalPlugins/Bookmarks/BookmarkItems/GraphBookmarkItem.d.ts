import type { GraphPluginInstanceOptions } from '../../Graph/GraphPluginInstanceOptions.d.ts';
import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public */
export interface GraphBookmarkItem extends BookmarkItem {
    options: GraphPluginInstanceOptions;
    title: string;
    type: 'graph';
}
