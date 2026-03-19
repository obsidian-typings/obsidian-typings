import type { EditorRange } from 'obsidian';

/**
 * A clickable token in the editor with position, text, and type information.
 *
 * @public
 * @unofficial
 */
export interface Token extends EditorRange {
  /** Text content of the token. */
  text: string;

  /** Type of the token. */
  type: 'external-link' | 'internal-link' | 'tag';
}
