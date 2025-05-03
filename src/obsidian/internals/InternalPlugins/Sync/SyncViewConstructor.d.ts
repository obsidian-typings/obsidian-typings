import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { SyncPluginInstance } from './SyncPluginInstance.d.ts';
import type { SyncView } from './SyncView.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface SyncViewConstructor extends TypedViewConstructor<SyncView, [syncPluginInstance: SyncPluginInstance]> {}
