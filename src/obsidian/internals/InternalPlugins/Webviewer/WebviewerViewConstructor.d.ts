import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';
import type { WebviewerView } from './WebviewerView.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface WebviewerViewConstructor
    extends TypedViewConstructor<WebviewerView, [browserPluginInstance: WebviewerPluginInstance]>
{}
