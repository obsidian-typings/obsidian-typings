import type { EditorRangeEx } from './EditorRangeEx.d.ts';

/** @public */
export interface EnclosingTag {
    close: EditorRangeEx;
    open: EditorRangeEx;
}
