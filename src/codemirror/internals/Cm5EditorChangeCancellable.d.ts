import type { Cm5EditorChange } from './Cm5EditorChange.d.ts';
import type { Position } from './Position.d.ts';

/**
 * A cancellable editor change object in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorChangeCancellable extends Cm5EditorChange {
  /**
   * Cancels the change.
   */
  cancel(): void;

  /**
   * Modifies the change. All arguments are optional.
   *
   * @param from - New start position.
   * @param to - New end position.
   * @param text - New replacement text.
   */
  update?(from?: Position, to?: Position, text?: string[]): void;
}
