import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';

/**
 * A {@link VimOptionCallback} for an option declared as a string.
 *
 * @public
 * @unofficial
 */
export type VimStringOptionCallback = (value?: string, cm?: CodeMirrorEditor) => string | undefined;
