import type { WorkspaceLeaf } from 'obsidian';
import type { CanvasPluginInstance } from '../../InternalPlugins/Canvas/CanvasPluginInstance.d.ts';
import type { CanvasView } from '../../InternalPlugins/Canvas/CanvasView.d.ts';

/**
 * A constructor for a canvas view.
 *
 * @public
 */
export type CanvasViewConstructor = new(
    leaf: WorkspaceLeaf,
    canvasPluginInstance: CanvasPluginInstance
) => CanvasView;
