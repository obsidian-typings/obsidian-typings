import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';
import type { WebviewerView } from './WebviewerView.d.ts';

/**
 * Constructor interface for creating WebviewerView instances.
 * @public
 * @unofficial
 */
export interface WebviewerViewConstructor
    extends TypedViewConstructor<WebviewerView, [browserPluginInstance: WebviewerPluginInstance]>
{}
