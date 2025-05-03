import type { App } from 'obsidian';
import type { CanvasPluginInstance } from '../InternalPlugins/Canvas/CanvasPluginInstance.d.ts';
import type { LinkUpdater } from './LinkUpdater.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasLinkUpdater extends LinkUpdater {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    canvas: CanvasPluginInstance;
}
