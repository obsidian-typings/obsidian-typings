import type { VimKeyMappingContext } from './VimKeyMappingContext.d.ts';

/**
 * The fields every Vim key mapping carries, whatever kind of command it binds to.
 *
 * @public
 * @unofficial
 */
export interface VimKeyMappingBase {
  /**
   * The mode this mapping applies in. Omitted means it applies in every mode.
   */
  context?: VimKeyMappingContext;

  /**
   * Whether running the command leaves visual block mode.
   */
  exitVisualBlock?: boolean;

  /**
   * Whether the next key typed is taken literally rather than matched against further mappings.
   */
  expectLiteralNext?: boolean;

  /**
   * Whether repeating the command in insert mode interleaves it with the recorded keystrokes.
   */
  interlaceInsertRepeat?: boolean;

  /**
   * Whether the command counts as an edit, making it repeatable with `.`.
   */
  isEdit?: boolean;

  /**
   * The key sequence that triggers this mapping.
   */
  keys: string;

  /**
   * Whether the mapping refuses to be remapped further.
   */
  noremap?: boolean;

  /**
   * A repeat count that overrides whatever the user typed.
   */
  repeatOverride?: number;
}
