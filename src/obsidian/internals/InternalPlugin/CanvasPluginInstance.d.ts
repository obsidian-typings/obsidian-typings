import type {
    App,
    Debouncer
} from 'obsidian';
import type { PromisedQueue } from '../PromisedQueue.js';
import type { CanvasDataManager } from './CanvasDataManager.js';
import type { CanvasIndex } from './CanvasIndex.js';
import type { CanvasPlugin } from './CanvasPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
    app: App;
    defaultOn: boolean;
    index: CanvasIndex;
    localDataManager: CanvasDataManager;
    options: {
        cardLabelVisibility?: 'always' | 'hover' | 'never';
        defaultModDragBehavior?: 'card' | 'group' | 'media' | 'menu' | 'note' | 'webpage';
        defaultWheelBehavior?: 'pan' | 'zoom';
        newFileLocation?: 'root' | 'current' | 'folder';
        newFileFolderPath?: string;
        snapToGrid?: boolean;
        snapToObjects?: boolean;
        zoomBreakpoint?: number;
    };
    plugin: CanvasPlugin;
    renameQueue: PromisedQueue;
    renames: unknown[];
    requestProcessRename: Debouncer<[], unknown>;
}
