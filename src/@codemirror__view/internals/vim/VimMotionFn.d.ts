import type { EditorPosition } from 'obsidian';

import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimInputState } from './VimInputState.d.ts';
import type { VimMotionResult } from './VimMotionResult.d.ts';
import type { VimResolvedMotionArgs } from './VimResolvedMotionArgs.d.ts';
import type { VimStateVim } from './VimStateVim.d.ts';

/**
 * Implements a motion, working out where the cursor should end up without changing the document.
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
