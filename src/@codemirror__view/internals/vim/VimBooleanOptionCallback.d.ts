import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';

/**
 * A {@link VimOptionCallback} for an option declared as a boolean.
 *
 * @public
 * @unofficial
 */
export type VimBooleanOptionCallback = (value?: boolean, cm?: CodeMirrorEditor) => boolean | undefined;
