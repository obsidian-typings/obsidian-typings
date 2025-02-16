import type { GraphColorGroupOptionsGroup as GraphColorGroupOptionsGroup } from './GraphColorGroupOptionsGroup.d.ts';
import type { GraphOptions } from './GraphOptions.d.ts';

/** @public */
export interface GraphColorGroupOptions extends GraphOptions {
    groups: GraphColorGroupOptionsGroup[];
}
