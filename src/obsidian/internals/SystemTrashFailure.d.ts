import type { Notice } from 'obsidian';

/**
 * The notice {@link obsidian#FileManager.showSystemTrashFailed} shows while files fail to move to the system trash.
 *
 * @public
 * @unofficial
 */
export interface SystemTrashFailure {
  /** How many files have failed since the notice was shown. */
  count: number;

  /** The notice, updated with the new count for each further failure while it is still shown. */
  notice: Notice;
}
