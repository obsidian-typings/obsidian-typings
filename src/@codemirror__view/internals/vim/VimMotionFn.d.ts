import type { EditorPosition } from 'obsidian';

import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimInputState } from './VimInputState.d.ts';
import type { VimMotionResult } from './VimMotionResult.d.ts';
import type { VimResolvedMotionArgs } from './VimResolvedMotionArgs.d.ts';
import type { VimStateVim } from './VimStateVim.d.ts';

/**
 * Implements a motion, working out where the cursor should end up without changing the document. It
 * returns the position the cursor should move to.
 *
 * The `head` it is given is the cursor's current position, which in visual mode can differ from what
 * `getCursor('head')` reports, and `motionArgs` is what the key mapping passed through.
 *
 * @public
 * @unofficial
 */
export type VimMotionFn = (
  cm: CodeMirrorEditor,
  head: EditorPosition,
  motionArgs: VimResolvedMotionArgs,
  vim: VimStateVim,
  inputState: VimInputState
) => VimMotionResult;
