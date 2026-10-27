import type { Value } from 'obsidian';

/**
 * A group summary returned by the Bases query controller for manual group ordering.
 *
 * @public
 * @unofficial
 */
export interface BasesGroupSummary {
  /** The number of entries in the group. */
  count: number;

  /** Whether the group is included in the configured manual order. */
  isVisible: boolean;

  /** The grouping value, including a NullValue for entries without a value. */
  key: Value;
}
