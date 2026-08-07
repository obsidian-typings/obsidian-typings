import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimResolvedActionArgs } from './VimResolvedActionArgs.d.ts';
import type { VimStateVim } from './VimStateVim.d.ts';

/**
 * Implements an action — a command that does its own work rather than waiting for a motion to give it
 * a range.
 *
 * @public
 * @unofficial
 */
export type VimActionFn = (cm: CodeMirrorEditor, actionArgs: VimResolvedActionArgs, vim: VimStateVim) => void;
