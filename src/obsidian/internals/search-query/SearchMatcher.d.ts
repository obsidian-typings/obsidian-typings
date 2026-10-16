import type { SearchMatchContext } from './SearchMatchContext.d.ts';
import type { SearchMatcherTokenContext } from './SearchMatcherTokenContext.d.ts';
import type { SearchMatchResult } from './SearchMatchResult.d.ts';
import type { SearchRequiredInputs } from './SearchRequiredInputs.d.ts';

/**
 * A node of a compiled search query's matcher tree.
 *
 * This is the abstract base every concrete matcher extends (text, regex, property, boolean, `file:`, `tag:`
 * and the other operators, and the `AND` / `OR` / negation operators). {@link SearchMatcher.getInfo},
 * {@link SearchMatcher.match} and {@link SearchMatcher.requiredInputs} are implemented by every concrete
 * matcher; the base class declares the token bookkeeping.
 *
 * @public
 * @unofficial
 */
export interface SearchMatcher {
  /**
   * The query tokens this matcher consumed while the query was parsed.
   */
  matchedTokens: unknown[];

  /**
   * Consumes the parser's current token, recording it in {@link SearchMatcher.matchedTokens}.
   *
   * @param state - The parser state.
   */
  eatToken(state: unknown): void;

  /**
   * Finds the matcher that owns the query token at a cursor offset.
   *
   * @param offset - The offset in the raw query string.
   * @returns The token and the chain of matchers that own it, or `null` if none does.
   */
  getContext(offset: number): null | SearchMatcherTokenContext;

  /**
   * Describes this matcher, as shown by the search view's "Explain search term".
   *
   * @returns The description.
   */
  getInfo(): string;

  /**
   * Matches this node against a context.
   *
   * @param context - The context to match.
   * @returns The match result, `null` on no match, or `undefined` when this node cannot decide for the context.
   */
  match(context: SearchMatchContext): null | SearchMatchResult | undefined;

  /**
   * The inputs this matcher needs to evaluate a file.
   *
   * @returns The required inputs.
   */
  requiredInputs(): SearchRequiredInputs;
}
