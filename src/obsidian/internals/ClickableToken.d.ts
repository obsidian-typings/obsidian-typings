import type { EditorPosition } from 'obsidian';

/**
 * Represents a clickable token in the editor (e.g. link, tag).
 * @public
 * @unofficial
 */
export interface ClickableToken {
  /** End position of the token in the editor. */
  end: EditorPosition;

  /** Start position of the token in the editor. */
  start: EditorPosition;

  /** Text content of the token. */
  text: string;

  /** Type of clickable token (e.g. "internal-link", "external-link", "tag"). */
  type: string;
}
