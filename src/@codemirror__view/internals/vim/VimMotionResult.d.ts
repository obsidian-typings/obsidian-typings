import type { EditorPosition } from 'obsidian';

/**
 * What a motion returns: the position it moved to, the pair of positions it selected, or nothing when
 * the motion did not apply.
 *
 * @public
 * @unofficial
 */
export type VimMotionResult = [anchor: EditorPosition, head: EditorPosition] | EditorPosition | null | undefined;
