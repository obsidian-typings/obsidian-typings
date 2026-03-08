import type { OutlineView } from '../../internal-plugins/outline/OutlineView.d.ts';
import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { OutlinePluginInstance } from './OutlinePluginInstance.d.ts';

/**
 * Constructor interface for creating OutlineView instances.
 * @public
 * @unofficial
 */
export interface OutlineViewConstructor
    extends TypedViewConstructor<OutlineView, [outlinePluginInstance: OutlinePluginInstance]>
{}
