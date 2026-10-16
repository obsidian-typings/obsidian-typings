import type { SearchMatchContext } from './SearchMatchContext.d.ts';
import type { SearchMatcher } from './SearchMatcher.d.ts';
import type { SearchMatchResult } from './SearchMatchResult.d.ts';

/**
 * The matcher of the `[key]` and `[key: value]` property operators.
 *
 * @public
 * @unofficial
 */
export interface SearchPropertyMatcher extends SearchMatcher {
  /**
   * The matcher the property name is matched with.
   */
  key: SearchMatcher;

  /**
   * The matcher each property value is matched with, or `null` for a bare `[key]` query.
   */
  value: null | SearchMatcher;

  /**
   * Constructor.
   *
   * @param key - The matcher the property name is matched with.
   * @param value - The matcher each property value is matched with, or `null` for a bare `[key]` query.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(key: SearchMatcher, value: null | SearchMatcher): this;

  /**
   * Matches the context's top-level frontmatter properties.
   *
   * Every property whose name {@link SearchPropertyMatcher.key} matches is reported. With a
   * {@link SearchPropertyMatcher.value}, each scalar value, or each item of an array value, is matched against
   * it through {@link SearchMatchContext.cloneForPropertyContent}.
   *
   * @param context - The context to match.
   * @returns The matched properties, `null` when none matched, or `undefined` when the context has no `content`
   * input.
   */
  match(context: SearchMatchContext): null | SearchMatchResult | undefined;
}
