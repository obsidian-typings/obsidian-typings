import type { EditorPosition } from 'obsidian';

/**
 * Information about a heading section in a note, including its text and position range.
 * @public
 * @unofficial
 */
export interface HeadingInfo {
  /** End position of the heading section in the editor. */
  end: EditorPosition;

  /** The heading text content. */
  heading: string;

  /** Start position of the heading section in the editor. */
  start: EditorPosition;
}
