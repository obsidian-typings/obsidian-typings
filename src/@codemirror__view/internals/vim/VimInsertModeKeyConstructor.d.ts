import type { VimInsertModeKey } from './VimInsertModeKey.d.ts';

/**
 * Constructs a {@link VimInsertModeKey} from the keyboard event that produced it.
 *
 * @public
 * @unofficial
 */
export interface VimInsertModeKeyConstructor {
  /**
   * Record a keystroke made while insert mode was active.
   *
   * @param keyName - The Vim-style name of the key, such as `<C-a>`.
   * @param e - The keyboard event the modifier state is read from.
   * @returns The recorded keystroke.
   */
  new (keyName: string, e: KeyboardEvent): VimInsertModeKey;
}
