import type {
    App,
    Debouncer
} from 'obsidian';
import type { PromisedQueue } from '../../PromisedQueue.d.ts';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CanvasDataManager } from './CanvasDataManager.d.ts';
import type { CanvasIndex } from './CanvasIndex.d.ts';
import type { CanvasPlugin } from './CanvasPlugin.d.ts';
import type { CanvasPluginInstanceOptions } from './CanvasPluginInstanceOptions.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    index: CanvasIndex;

    /** @todo Documentation incomplete. */
    localDataManager: CanvasDataManager;

    /** @todo Documentation incomplete. */
    options: CanvasPluginInstanceOptions;

    /** @todo Documentation incomplete. */
    plugin: CanvasPlugin;

    /** @todo Documentation incomplete. */
    renameQueue: PromisedQueue;

    /** @todo Documentation incomplete. */
    renames: unknown[];

    /** @todo Documentation incomplete. */
    requestProcessRename: Debouncer<[], unknown>;
}
