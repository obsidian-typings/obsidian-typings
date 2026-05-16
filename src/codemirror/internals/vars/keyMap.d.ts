import type { Cm5Editor } from '../Cm5Editor.d.ts';

/**
 * A map of key map definitions for CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export declare const keyMap: Record<string, Record<string, ((cm: Cm5Editor) => void) | string>>;
