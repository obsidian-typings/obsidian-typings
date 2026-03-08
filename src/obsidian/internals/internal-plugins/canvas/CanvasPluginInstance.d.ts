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
 * Plugin instance for the Canvas internal plugin, managing canvas indexing, data, and rename operations.
 * @public
 * @unofficial
 */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
    /** Reference to the Obsidian app instance. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Index for resolving links and embeds within canvas files. */
    index: CanvasIndex;

    /** Manager for loading, saving, and handling canvas local data. */
    localDataManager: CanvasDataManager;

    /** User-configurable options for the canvas plugin. */
    options: CanvasPluginInstanceOptions;

    /** Reference to the parent canvas plugin. */
    plugin: CanvasPlugin;

    /** Queue for processing file rename operations sequentially. */
    renameQueue: PromisedQueue;

    /** Pending rename operations to be processed. */
    renames: unknown[];

    /** Debounced function to process pending rename operations. */
    requestProcessRename: Debouncer<[], unknown>;
}
