import type { VimInsertModeKey } from './VimInsertModeKey.d.ts';

/**
 * A single recorded insert-mode edit: a keystroke, the text that was typed, or a pair of the text and
 * how many characters it replaced.
 *
 * @public
 * @unofficial
 */
export type VimInsertModeChange = [text: string, deleted?: number] | string | VimInsertModeKey;
