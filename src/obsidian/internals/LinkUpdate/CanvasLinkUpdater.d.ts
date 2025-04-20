import type { App } from 'obsidian';
import type { CanvasPluginInstance } from '../InternalPlugins/Canvas/CanvasPluginInstance.d.ts';
import type { LinkUpdater } from './LinkUpdater.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CanvasLinkUpdater extends LinkUpdater {
    app: App;
    canvas: CanvasPluginInstance;
}
