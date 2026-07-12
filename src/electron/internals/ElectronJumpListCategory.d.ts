import type { ElectronJumpListItem } from './ElectronJumpListItem.d.ts';

/**
 * A category in a Windows Jump List.
 *
 * @public
 * @unofficial
 */
export interface ElectronJumpListCategory {
  /** Array of `ElectronJumpListItem` objects if `type` is `tasks` or `custom`, otherwise omitted. */
  items?: ElectronJumpListItem[];

  /** Must be set if `type` is `custom`, otherwise omitted. */
  name?: string;

  /** The type of the category. */
  type?: 'custom' | 'frequent' | 'recent' | 'tasks';
}
