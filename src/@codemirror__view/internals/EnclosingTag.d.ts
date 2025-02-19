import type { EditorRangeEx } from './EditorRangeEx.d.ts';

/** @public */
export interface EnclosingTag {
    open: EditorRangeEx;
    close: EditorRangeEx;
}
