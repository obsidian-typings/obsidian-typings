import type { EditorPosition } from 'obsidian';

import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { CodeMirrorEditorSelectionRange } from '../CodeMirrorEditorSelectionRange.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';

/**
 * Implements an operator, transforming the text a motion selected. The `ranges` it is given are the
 * stretches of text to operate on; returning a position moves the cursor there once the operation
 * finishes, and returning nothing leaves the cursor where the operator put it.
 *
 * @public
 * @unofficial
 */
export type VimOperatorFn = (
  cm: CodeMirrorEditor,
  operatorArgs: VimOperatorArgs,
  ranges: CodeMirrorEditorSelectionRange[],
  oldAnchor: EditorPosition,
  newHead?: EditorPosition
) => EditorPosition | void;
