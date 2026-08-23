import type { EditorPosition } from 'obsidian';

import type { VimInsertAt } from './VimInsertAt.d.ts';
import type { VimResizeDirection } from './VimResizeDirection.d.ts';
import type { VimScrollPosition } from './VimScrollPosition.d.ts';

/**
 * Arguments describing how a Vim action behaves.
 *
 * Every field is optional because a key mapping only supplies the ones its action cares about. The
 * resolved form handed to an action handler always carries a `repeat`, modelled by
 * {@link VimResolvedActionArgs}.
 *
 * @public
 * @unofficial
 */
export interface VimActionArgs {
  /**
   * Whether the action takes effect after the cursor rather than before it.
   */
  after?: boolean;

  /**
   * Whether the cursor steps back onto the last inserted character once the action completes.
   */
  backtrack?: boolean;

  /**
   * Whether the action treats the register contents as a visual block.
   */
  blockwise?: boolean;

  /**
   * Which way a resize action changes the size of its target.
   */
  direction?: VimResizeDirection;

  /**
   * Whether the action moves towards the end of the document.
   */
  forward?: boolean;

  /**
   * The position the action starts from, when it does not start from the cursor.
   */
  head?: EditorPosition;

  /**
   * Whether a numeric action increments. `false` decrements.
   */
  increase?: boolean;

  /**
   * Whether an indent action adds indentation. `false` removes it.
   */
  indentRight?: boolean;

  /**
   * Where the cursor is placed when the action enters insert mode.
   */
  insertAt?: VimInsertAt;

  /**
   * Whether the action counts as an edit, making it repeatable with `.`.
   */
  isEdit?: boolean;

  /**
   * Whether a join action preserves the whitespace between the joined lines.
   */
  keepSpaces?: boolean;

  /**
   * Whether the action operates on whole lines rather than a character range.
   */
  linewise?: boolean;

  /**
   * Whether pasted text is re-indented to match the surrounding lines.
   */
  matchIndent?: boolean;

  /**
   * Where the cursor line is placed in the viewport, for scroll-positioning actions.
   */
  position?: VimScrollPosition;

  /**
   * The register the action reads from or writes to. Defaults to the unnamed register.
   */
  registerName?: string;

  /**
   * How many times the action is applied.
   */
  repeat?: number;

  /**
   * Whether the repeat count was typed by the user rather than defaulted.
   */
  repeatIsExplicit?: boolean;

  /**
   * Whether the action replaces the existing text rather than inserting alongside it.
   */
  replace?: boolean;

  /**
   * The character the action was given, for actions such as `r` that take one.
   */
  selectedCharacter?: string;
}
