import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TagPanePlugin } from './TagPanePlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface TagPanePluginInstance extends InternalPluginInstance<TagPanePlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    defaultOn: true;

    /**
     * @todo Documentation incomplete.
     */
    plugin: TagPanePlugin;
}
