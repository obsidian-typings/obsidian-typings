import type { CmEditorSelection } from './CmEditorSelection.d.ts';
import type { CmText } from './CmText.d.ts';
import type { Extension } from './Extension.d.ts';

/**
 * Configuration for creating an editor state.
 *
 * @public
 * @unofficial
 */
export interface EditorStateConfig {
  /** The initial document. */
  doc?: CmText | string;

  /** Extensions to associate with this state. */
  extensions?: Extension;

  /** The starting selection. */
  selection?: { anchor: number; head?: number } | CmEditorSelection;
}
