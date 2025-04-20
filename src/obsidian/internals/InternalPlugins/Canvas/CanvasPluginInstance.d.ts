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
 * @public
 * @unofficial
 */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
    app: App;
    defaultOn: true;
    index: CanvasIndex;
    localDataManager: CanvasDataManager;
    options: CanvasPluginInstanceOptions;
    plugin: CanvasPlugin;
    renameQueue: PromisedQueue;
    renames: unknown[];
    requestProcessRename: Debouncer<[], unknown>;
}
