import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { BasesPluginInstance } from './BasesPluginInstance.d.ts';
import type { BasesView } from './BasesView.d.ts';

/**
 * Bases view constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesViewConstructor
    extends TypedViewConstructor<BasesView, [basesPluginInstance: BasesPluginInstance]>
{}
