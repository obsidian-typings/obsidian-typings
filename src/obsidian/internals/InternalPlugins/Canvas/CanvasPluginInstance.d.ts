import type {
    App,
    Debouncer
} from 'obsidian';
import type { PromisedQueue } from '../../PromisedQueue.d.ts';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { CanvasDataManager } from './CanvasDataManager.d.ts';
import type { CanvasIndex } from './CanvasIndex.d.ts';
import type { CanvasPlugin } from './CanvasPlugin.d.ts';

/** @public */
export interface CanvasPluginInstance extends InternalPluginInstance<CanvasPlugin> {
    app: App;
    defaultOn: true;
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
