import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PagePreviewPlugin } from './PagePreviewPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface PagePreviewPluginInstance extends InternalPluginInstance<PagePreviewPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    defaultOn: true;
}
