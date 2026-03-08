import type { App } from 'obsidian';
import type { CanvasPluginInstance } from '../internal-plugins/canvas/CanvasPluginInstance.d.ts';
import type { LinkUpdater } from './LinkUpdater.d.ts';

/**
 * Link updater for canvas files, handling link updates when files are renamed or moved.
 * @public
 * @unofficial
 */
export interface CanvasLinkUpdater extends LinkUpdater {
    /** Reference to the app. */
    app: App;

    /** Canvas plugin instance used to access canvas data. */
    canvas: CanvasPluginInstance;
}
