import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TemplatesPlugin } from './TemplatesPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface TemplatesPluginInstance extends InternalPluginInstance<TemplatesPlugin> {
    app: App;
    defaultOn: true;
    plugin: TemplatesPlugin;
}
