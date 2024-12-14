import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { CanvasPluginInstance } from '../../../internals/InternalPlugins/Canvas/CanvasPluginInstance.js';
import type { CanvasView } from '../../../internals/InternalPlugins/Canvas/CanvasView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the CanvasView constructor.
 *
 * @returns The CanvasView constructor.
 * @public
 */
export function getCanvasViewConstructor(app: App): CanvasViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Canvas) as CanvasViewConstructor;
}

/**
 * A constructor for a canvas view.
 *
 * @public
 */
type CanvasViewConstructor = new(
    leaf: WorkspaceLeaf,
    canvasPluginInstance: CanvasPluginInstance
) => CanvasView;
