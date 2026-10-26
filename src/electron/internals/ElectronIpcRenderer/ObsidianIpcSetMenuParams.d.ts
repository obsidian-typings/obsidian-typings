import type { ObsidianIpcMenuItemTemplate } from './ObsidianIpcMenuItemTemplate.d.ts';

/**
 * The application menu Obsidian's `set-menu` IPC channel takes.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcSetMenuParams {
  /** The menu template. The `&Window` and `&Help` menus move to the end. */
  template: ObsidianIpcMenuItemTemplate[];
}
