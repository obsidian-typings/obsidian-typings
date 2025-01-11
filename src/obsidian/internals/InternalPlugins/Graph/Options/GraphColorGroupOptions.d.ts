import type { GraphOptions } from "./GraphOptions.js";
import type { GraphColorGroupOptionsGroup as GraphColorGroupOptionsGroup } from "./GraphColorGroupOptionsGroup.js";

/** @public */
export interface GraphColorGroupOptions extends GraphOptions {
    groups: GraphColorGroupOptionsGroup[];
}
