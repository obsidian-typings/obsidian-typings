import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { WebviewerHistoryView } from './WebviewerHistoryView.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';

/**
 * Constructor interface for creating WebviewerHistoryView instances.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryViewConstructor
    extends TypedViewConstructor<WebviewerHistoryView, [browserPluginInstance: WebviewerPluginInstance]>
{}
