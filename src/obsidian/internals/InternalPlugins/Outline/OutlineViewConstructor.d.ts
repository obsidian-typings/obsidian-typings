import type { OutlineView } from '../../InternalPlugins/Outline/OutlineView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { OutlinePluginInstance } from './OutlinePluginInstance.d.ts';

/** @public @unofficial */
export interface OutlineViewConstructor
    extends TypedViewConstructor<OutlineView, [outlinePluginInstance: OutlinePluginInstance]>
{}
