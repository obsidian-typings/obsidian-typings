import type { Grammar } from './Grammar.d.ts';

/**
 * Describes a token pattern for Prism grammar definitions.
 *
 * @public
 * @unofficial
 */
export interface PrismTokenObject {
  /** Alias name(s) for the token type. */
  alias?: string | string[];

  /** Whether this token is greedy. */
  greedy?: boolean;

  /** Nested grammar applied inside the matched token. */
  inside?: Grammar;

  /** Whether to apply lookbehind to the pattern. */
  lookbehind?: boolean;

  /** The regex pattern to match. */
  pattern: RegExp;
}
