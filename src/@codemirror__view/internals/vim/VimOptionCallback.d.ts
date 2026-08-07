import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimOptionValue } from './VimOptionValue.d.ts';

/**
 * Called when a Vim option is read or written, for options that are not backed by a stored value. When
 * an option is defined with one of these, the Vim layer keeps no value of its own and uses the callback
 * as both getter and setter: called **without** a value it should return the option's current value,
 * and called **with** one it should store it.
 *
 * Whether an editor is passed decides which copy is being addressed — the global one when it is absent,
 * that editor's own when it is present — so a single `setOption` or `getOption` call can invoke the
 * callback twice, once per copy. An option that should have no global value must either ignore the
 * editor argument every time, or always be addressed with an explicit scope.
 *
 * @public
 * @unofficial
 */
export type VimOptionCallback = (value?: VimOptionValue, cm?: CodeMirrorEditor) => VimOptionValue;
