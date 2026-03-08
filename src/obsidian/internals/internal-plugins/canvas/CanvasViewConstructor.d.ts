import type { CanvasView } from '../../internal-plugins/canvas/CanvasView.d.ts';
import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';

/**
 * Constructor interface for creating CanvasView instances.
 * @public
 * @unofficial
 */
export interface CanvasViewConstructor
    extends TypedViewConstructor<CanvasView, [canvasPluginInstance: CanvasPluginInstance]>
{}
