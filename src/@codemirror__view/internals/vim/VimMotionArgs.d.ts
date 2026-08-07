/**
 * Arguments describing how a Vim motion should move the cursor.
 *
 * Every field is optional because a key mapping only supplies the ones its motion cares about. The
 * resolved form handed to a motion handler always carries a `repeat`, modelled by
 * {@link VimResolvedMotionArgs}.
 *
 * @public
 * @unofficial
 */
export interface VimMotionArgs {
  /**
   * Whether the motion operates on WORDs (whitespace-delimited) rather than words.
   */
  bigWord?: boolean;

  /**
   * Whether the motion consumes a repeat count typed before it.
   */
  explicitRepeat?: boolean;

  /**
   * Whether the motion moves towards the end of the document.
   */
  forward?: boolean;

  /**
   * Whether the character under the resulting cursor position is part of the motion's range.
   */
  inclusive?: boolean;

  /**
   * Whether the motion covers whole lines rather than a character range.
   */
  linewise?: boolean;

  /**
   * Whether the motion refuses to be repeated by a count.
   */
  noRepeat?: boolean;

  /**
   * How many times the motion is applied.
   */
  repeat?: number;

  /**
   * Whether the repeat count was typed by the user rather than defaulted.
   */
  repeatIsExplicit?: boolean;

  /**
   * Offset applied to the repeat count before the motion runs.
   */
  repeatOffset?: number;

  /**
   * Whether the motion is confined to the line it started on.
   */
  sameLine?: boolean;

  /**
   * The character the motion searches for, for character-search motions such as `f` and `t`.
   */
  selectedCharacter?: string;

  /**
   * Whether a text-object motion selects the inner range, excluding its delimiters.
   */
  textObjectInner?: boolean;

  /**
   * Whether the motion lands on the first non-whitespace character of the target line.
   */
  toFirstChar?: boolean;

  /**
   * Whether the position the motion started from is pushed onto the jump list.
   */
  toJumplist?: boolean;

  /**
   * Whether a word motion lands on the end of the word rather than its start.
   */
  wordEnd?: boolean;
}
