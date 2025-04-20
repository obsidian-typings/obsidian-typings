import type { EditorRangeEx } from './EditorRangeEx.d.ts';

/**
 * @public
 * @unofficial
 */
export interface EnclosingTag {
    close: EditorRangeEx;
    open: EditorRangeEx;
}
