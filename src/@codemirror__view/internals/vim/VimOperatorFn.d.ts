import type { EditorPosition } from 'obsidian';

import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { CodeMirrorEditorSelectionRange } from '../CodeMirrorEditorSelectionRange.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';

/**
 * Implements an operator, transforming the ranges a motion selected.
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
