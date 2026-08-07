import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimExCommandParams } from './VimExCommandParams.d.ts';

/**
 * Implements an Ex command.
 *
 * @public
 * @unofficial
 */
export type VimExFn = (cm: CodeMirrorEditor, params: VimExCommandParams) => void;
