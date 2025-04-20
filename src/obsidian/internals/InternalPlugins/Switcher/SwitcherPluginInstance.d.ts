import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SwitcherPlugin } from './SwitcherPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SwitcherPluginInstance extends InternalPluginInstance<SwitcherPlugin> {
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
    plugin: SwitcherPlugin;
}
