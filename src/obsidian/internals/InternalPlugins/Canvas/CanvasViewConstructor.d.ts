import type { CanvasView } from '../../InternalPlugins/Canvas/CanvasView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';

/**
 * Constructor interface for creating CanvasView instances.
 * @public
 * @unofficial
 */
export interface CanvasViewConstructor
    extends TypedViewConstructor<CanvasView, [canvasPluginInstance: CanvasPluginInstance]>
{}
