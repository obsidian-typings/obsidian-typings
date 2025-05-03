import type { CanvasView } from '../../InternalPlugins/Canvas/CanvasView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CanvasViewConstructor
    extends TypedViewConstructor<CanvasView, [canvasPluginInstance: CanvasPluginInstance]>
{}
