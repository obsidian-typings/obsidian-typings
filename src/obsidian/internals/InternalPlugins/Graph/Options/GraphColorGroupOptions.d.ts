import type { GraphColorGroupOptionsGroup as GraphColorGroupOptionsGroup } from './GraphColorGroupOptionsGroup.d.ts';
import type { GraphOptions } from './GraphOptions.d.ts';

/** @public @unofficial */
export interface GraphColorGroupOptions extends GraphOptions {
    groups: GraphColorGroupOptionsGroup[];
}
