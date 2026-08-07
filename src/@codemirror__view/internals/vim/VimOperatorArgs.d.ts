import type { VimLastSelectionRange } from './VimLastSelectionRange.d.ts';

/**
 * Arguments describing how a Vim operator transforms the range a motion selected.
 *
 * @public
 * @unofficial
 */
export interface VimOperatorArgs {
  /**
   * Whether the operator consumes the whole line including its terminator, rather than stopping at the
   * last character.
   */
  fullLine?: boolean;

  /**
   * Whether an indent operator adds indentation. `false` removes it.
   */
  indentRight?: boolean;

  /**
   * Whether the cursor stays where it was instead of moving to the start of the affected range.
   */
  keepCursor?: boolean;

  /**
   * The previous visual selection, for operators that repeat it.
   */
  lastSel?: VimLastSelectionRange;

  /**
   * Whether the operator applies to whole lines rather than a character range.
   */
  linewise?: boolean;

  /**
   * The register the operator reads from or writes to. Defaults to the unnamed register.
   */
  registerName?: null | string;

  /**
   * How many times the operator is applied.
   */
  repeat?: number;

  /**
   * The character the operator was given, for operators such as `r` that take one.
   */
  selectedCharacter?: string;

  /**
   * Whether the cursor moves to the end of the affected range once the operator has run.
   */
  shouldMoveCursor?: boolean;

  /**
   * Whether a case-changing operator makes the text lower case. `false` makes it upper case, and
   * omitting it toggles the case of each character.
   */
  toLower?: boolean;
}
