import type { VimOptionCallback } from './VimOptionCallback.d.ts';
import type { VimOptionType } from './VimOptionType.d.ts';
import type { VimOptionValue } from './VimOptionValue.d.ts';

/**
 * One registered Vim option.
 *
 * The global registry holds the fully described option; an editor's own copy carries only the `value`
 * that overrides it.
 *
 * @public
 * @unofficial
 */
export interface VimOption {
  /**
   * Invoked to read and write the option, for options not backed by a stored value.
   */
  callback?: VimOptionCallback;

  /**
   * The value the option takes until it is set.
   */
  defaultValue?: VimOptionValue;

  /**
   * The kind of value the option holds. Defaults to `string` when the option was defined without one.
   */
  type?: VimOptionType;

  /**
   * The option's current value.
   */
  value?: VimOptionValue;
}
