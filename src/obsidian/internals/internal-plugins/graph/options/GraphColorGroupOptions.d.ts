import type { GraphColorGroupOptionsGroup as GraphColorGroupOptionsGroup } from './GraphColorGroupOptionsGroup.d.ts';
import type { GraphOptions } from './GraphOptions.d.ts';

/**
 * Options section for managing color groups that visually categorize graph nodes.
 * @public
 * @unofficial
 */
export interface GraphColorGroupOptions extends GraphOptions {
  /** List of UI groups, each representing a user-defined color group entry. */
  groups: GraphColorGroupOptionsGroup[];
}
