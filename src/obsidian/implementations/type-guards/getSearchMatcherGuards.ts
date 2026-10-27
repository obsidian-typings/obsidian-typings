import type { App } from 'obsidian';

import type { SearchMatcher } from '../../internals/search-query/SearchMatcher.d.ts';
import type { SearchMatcherGuards } from '../../internals/search-query/SearchMatcherGuards.d.ts';

import { getObsidianSearchQueryConstructor } from '../constructors/internals/getObsidianSearchQueryConstructor.ts';

/**
 * Creates exact prototype guards by compiling probe queries with the running app's parser.
 *
 * No translated descriptions or minified names are inspected. Create the guards once per app;
 * each predicate rejects unknown nodes, including subclasses. Unsupported nodes must keep all candidates.
 * Probe compilation does not start Search or change an existing search pane.
 *
 * @param app - The app instance.
 * @returns Guards tied to this app's parser prototypes.
 * @public
 * @unofficial
 */
export function getSearchMatcherGuards(app: App): SearchMatcherGuards {
  const Query = getObsidianSearchQueryConstructor(app);
  return {
    and: guard('alpha bravo'),
    case: guard('match-case:alpha'),
    comparison: guard('[alpha:>bravo]', 'value'),
    content: guard('content:alpha'),
    file: guard('file:alpha'),
    negation: guard('-alpha'),
    or: guard('alpha OR bravo'),
    path: guard('path:alpha'),
    property: guard('[alpha]'),
    quotedText: guard('"alpha"'),
    regex: guard('/alpha/'),
    tag: guard('tag:alpha'),
    text: guard('alpha')
  };

  function guard<T extends SearchMatcher>(query: string, child?: 'value'): (matcher: SearchMatcher) => matcher is T {
    const probe = new Query(app, query, false).matcher;
    if (!probe) {
      throw new Error('The matcher probe did not compile.');
    }
    if (child && !(child in probe)) {
      throw new Error('The matcher probe has no value node.');
    }
    const node: unknown = child && child in probe ? probe[child] : probe;
    if (!node || typeof node !== 'object') {
      throw new Error('The matcher probe has no value matcher.');
    }
    const prototype = Object.getPrototypeOf(node);
    return (matcher): matcher is T => Object.getPrototypeOf(matcher) === prototype;
  }
}
