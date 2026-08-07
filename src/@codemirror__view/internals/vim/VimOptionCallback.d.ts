import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimOptionValue } from './VimOptionValue.d.ts';

/**
 * Called when a Vim option is read or written, for options backed by something other than a stored
 * value. It is invoked with a value when the option is set, and without one when it is read.
 *
 * @public
 * @unofficial
 */
export type VimOptionCallback = (value?: VimOptionValue, cm?: CodeMirrorEditor) => VimOptionValue;
