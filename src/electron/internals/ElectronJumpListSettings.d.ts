import type { ElectronJumpListItem } from './ElectronJumpListItem.d.ts';

/**
 * Current settings of the Windows Jump List.
 *
 * @public
 * @unofficial
 */
export interface ElectronJumpListSettings {
  /** The minimum number of items that will be shown in the Jump List. */
  minItems: number;

  /** Array of `ElectronJumpListItem` objects the user has explicitly removed from custom categories in the Jump List. */
  removedItems: ElectronJumpListItem[];
}
