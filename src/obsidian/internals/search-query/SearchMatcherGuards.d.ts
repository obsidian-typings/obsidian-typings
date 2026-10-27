import type { SearchCaseMatcher } from './SearchCaseMatcher.d.ts';
import type { SearchComparisonMatcher } from './SearchComparisonMatcher.d.ts';
import type { SearchCompositeMatcher } from './SearchCompositeMatcher.d.ts';
import type { SearchMatcher } from './SearchMatcher.d.ts';
import type { SearchPropertyMatcher } from './SearchPropertyMatcher.d.ts';
import type { SearchQuotedTextMatcher } from './SearchQuotedTextMatcher.d.ts';
import type { SearchRegexMatcher } from './SearchRegexMatcher.d.ts';
import type { SearchTagMatcher } from './SearchTagMatcher.d.ts';
import type { SearchTextMatcher } from './SearchTextMatcher.d.ts';
import type { SearchUnaryMatcher } from './SearchUnaryMatcher.d.ts';

/**
 * Exact prototype identity guards for matchers compiled by one running app.
 * Obtain these through {@link getSearchMatcherGuards} from the implementations entry point.
 * Unknown nodes and subclasses are rejected; callers narrowing candidate sets must keep those conservative.
 *
 * @public
 * @unofficial
 */
export interface SearchMatcherGuards {
  /**
   * Checks the exact prototype of a and matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's and prototype.
   */
  and(matcher: SearchMatcher): matcher is SearchCompositeMatcher;

  /**
   * Checks the exact prototype of a case matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's case prototype.
   */
  case(matcher: SearchMatcher): matcher is SearchCaseMatcher;

  /**
   * Checks the exact prototype of a comparison matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's comparison prototype.
   */
  comparison(matcher: SearchMatcher): matcher is SearchComparisonMatcher;

  /**
   * Checks the exact prototype of a content matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's content prototype.
   */
  content(matcher: SearchMatcher): matcher is SearchUnaryMatcher;

  /**
   * Checks the exact prototype of a file matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's file prototype.
   */
  file(matcher: SearchMatcher): matcher is SearchUnaryMatcher;

  /**
   * Checks the exact prototype of a negation matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's negation prototype.
   */
  negation(matcher: SearchMatcher): matcher is SearchUnaryMatcher;

  /**
   * Checks the exact prototype of a or matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's or prototype.
   */
  or(matcher: SearchMatcher): matcher is SearchCompositeMatcher;

  /**
   * Checks the exact prototype of a path matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's path prototype.
   */
  path(matcher: SearchMatcher): matcher is SearchUnaryMatcher;

  /**
   * Checks the exact prototype of a property matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's property prototype.
   */
  property(matcher: SearchMatcher): matcher is SearchPropertyMatcher;

  /**
   * Checks the exact prototype of a quotedText matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's quotedText prototype.
   */
  quotedText(matcher: SearchMatcher): matcher is SearchQuotedTextMatcher;

  /**
   * Checks the exact prototype of a regex matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's regex prototype.
   */
  regex(matcher: SearchMatcher): matcher is SearchRegexMatcher;

  /**
   * Checks the exact prototype of a tag matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's tag prototype.
   */
  tag(matcher: SearchMatcher): matcher is SearchTagMatcher;

  /**
   * Checks the exact prototype of a text matcher.
   *
   * @param matcher - The node to inspect.
   * @returns Whether the node has the current app's text prototype.
   */
  text(matcher: SearchMatcher): matcher is SearchTextMatcher;
}
