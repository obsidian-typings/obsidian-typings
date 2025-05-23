import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { WebviewerHistoryView } from './WebviewerHistoryView.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryViewConstructor
    extends TypedViewConstructor<WebviewerHistoryView, [browserPluginInstance: WebviewerPluginInstance]>
{}
