import type { GraphColorGroupOptionsGroup as GraphColorGroupOptionsGroup } from './GraphColorGroupOptionsGroup.js';
import type { GraphOptions } from './GraphOptions.js';

/** @public */
export interface GraphColorGroupOptions extends GraphOptions {
    groups: GraphColorGroupOptionsGroup[];
}
