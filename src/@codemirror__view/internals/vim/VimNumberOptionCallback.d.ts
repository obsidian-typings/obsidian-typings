import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';

/**
 * A {@link VimOptionCallback} for an option declared as a number.
 *
 * @public
 * @unofficial
 */
export type VimNumberOptionCallback = (value?: number, cm?: CodeMirrorEditor) => number | undefined;
