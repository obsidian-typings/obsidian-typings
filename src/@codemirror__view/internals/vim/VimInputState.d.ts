import type { VimChangeQueue } from './VimChangeQueue.d.ts';
import type { VimMotionArgs } from './VimMotionArgs.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';

/**
 * The half-typed command the key handler is assembling — the count, operator, motion and register seen
 * so far. It is cleared once the command runs or the input is abandoned.
 *
 * @public
 * @unofficial
 */
export interface VimInputState {
  /**
   * The text an insert-mode binding replaced, or `null` when nothing is pending.
   */
  changeQueue: null | VimChangeQueue;

  /**
   * The change queues of the other selections, when there is more than one.
   */
  changeQueueList?: (null | VimChangeQueue)[];

  /**
   * The keys typed towards the command being matched.
   */
  keyBuffer: string[];

  /**
   * The name of the motion typed so far, or `null` when none has been.
   */
  motion: null | string;

  /**
   * The arguments of the motion typed so far.
   */
  motionArgs: null | VimMotionArgs;

  /**
   * The digits of the count typed after the operator.
   */
  motionRepeat: string[];

  /**
   * The name of the operator typed so far, or `null` when none has been.
   */
  operator: null | string;

  /**
   * The arguments of the operator typed so far.
   */
  operatorArgs: null | VimOperatorArgs;

  /**
   * The keys of a multi-key operator, which repeats by retyping only its last character.
   */
  operatorShortcut?: string;

  /**
   * The digits of the count typed before the operator.
   */
  prefixRepeat: string[];

  /**
   * The register named for this command, or `null` for the unnamed register.
   */
  registerName: null | string;

  /**
   * The character typed for a command that takes one, such as `f` or `r`.
   */
  selectedCharacter?: string;

  /**
   * Resolve the typed digits into the count the command runs with.
   *
   * @returns The count, which is `0` when no digits were typed.
   */
  getRepeat(): number;

  /**
   * Append a digit to the count being typed, before or after the operator depending on how far the
   * command has got.
   *
   * @param n - The digit to append.
   */
  pushRepeatDigit(n: string): void;
}
