# Core Search queue and matcher verification

Verified on 2026-10-27 for both maintained streams: `release/obsidian-public/1.14.4` and `release/obsidian-catalyst/1.14.4`.

## Source identity

The `obsidian-versions` tags `1.14.4` (commit `c9ee8b9720f94a6423c98e65c84914dcbfc54a2e`) and `catalyst/1.14.4` (commit `67c7316bac0596ff15c8ffd611d56b3754fe3dca`) carry byte-identical `obsidian.asar/app.js`: git blob `8b091268ff2b18b7939891bff0b81c4b64f6fb21`. A pinned isolated desktop instance ran the public 1.14.4 application. The live checks were repeated against each stream's declarations and implementation. This verifies the maintained 1.14.4 surfaces; it does not claim that an arbitrary later build has the same internals.

Source anchors in that shared file:

1. Base matcher and token bookkeeping: line 83264. Literal/regex, quoted, composite, unary and property matchers follow it.
2. Parser state and parser entry: line 83697. Tokenizer: line 83849. Scope, case, task and tag operators follow it.
3. Queue component: line 117706. `start` constructs the queue, sorts `vault.getFiles()` using the result renderer's order, seeds it synchronously and returns it.
4. Search view constructor/input and case state: around line 157300. `startSearch` compiles the query and starts its queue.

## Delivered surface

`SearchView` now exposes `queue`, `matchingCase` and `searchComponent`. `SearchQueueComponent` extends Obsidian's `Component` and reuses `App`, `ResultDom` and `ItemQueue<TFile>`. Its active `queue` is nullable. `start(options?)` accepts optional method callbacks `onStart`, `onStop` and `onCancel`, stores and returns the same queue synchronously. `stop()` cancels it and clears the active reference. File-change handlers accept `TAbstractFile`, since vault events can carry folders, which core ignores.

The callback's stop event denotes an exhausted/paused runnable, not disposal: subsequent file events can add work. A candidate filter must affect only the initial batch and preserve later additions, ordering, cancellation, callbacks and core's existing scanner. This change supplies types; it does not install such a filter.

The matcher tree remains rooted in the existing `SearchMatcher` interface. New interfaces expose the runtime storage:

1. `SearchRegexMatcher`: regex source string, without delimiters or flags.
2. `SearchTextMatcher`: `text`, inherited escaped `regex`, and `setText`.
3. `SearchQuotedTextMatcher`: `text`, `partialMatchRegex` and `wholeWordRegex`, all strings. Content uses core's word boundaries; filenames use substring matching.
4. `SearchCompositeMatcher`: `matchers`, shared by AND and OR.
5. `SearchUnaryMatcher`: `matcher`, shared by negation and scopes.
6. `SearchCaseMatcher`: wrapped matcher and `caseSensitive` override.
7. `SearchTagMatcher`: a text child normalized to start with `#`; matching includes descendants and ignores case.
8. `SearchComparisonMatcher`: `text` and the comparison `type`.

Existing `SearchPropertyMatcher` continues to expose `key` and nullable `value`. `SearchQueryToken` replaces the two unknown token positions: `matchedTokens` and the token returned by `getContext`. Tokens carry `type`, decoded `content`, and starting raw-query UTF-16 `pos`. `AND` is ordinary text; uppercase `OR` is an operator.

## Runtime identification

`getSearchMatcherGuards(app)`, exported from the implementations entry point, compiles small probe queries through the running app's own query constructor. Its predicates compare exact prototype identity. They do not inspect translated `getInfo()` strings, minified constructor names or field-name guesses. Create guards once for the app, and use their TypeScript predicates to access the corresponding child fields without consumer casts.

```ts
import { getSearchMatcherGuards } from 'obsidian-typings/implementations';

const guards = getSearchMatcherGuards(app);
const matcher = searchView.searchQuery?.matcher;
if (matcher && guards.and(matcher)) {
  for (const child of matcher.matchers) {
    // Recursively narrow each child, keeping unsupported nodes conservative.
  }
}
```

Supported predicates are `and`, `or`, `negation`, `text`, `quotedText`, `regex`, `file`, `path`, `content`, `case`, `tag`, `property` and `comparison`. The last probes the property's **value child**, not the property's root. Structurally identical AND/OR and scope nodes have different prototypes. Text inherits from the regex matcher, so an `instanceof` check would conflate those; exact prototype equality does not.

Unknown nodes, subclasses and unsupported scopes are rejected. A recognized property wrapper may still contain an unsupported child. Candidate narrowing must recurse conservatively, treating any unsupported node as every file. Guard initialization can throw if the required core view or probe parser is unavailable; an accelerator should retain the original full scan in that case. These guards are deliberately not an exhaustive parser union.

## Verification procedure and results

1. Read both tagged sources and compare their git blob ids before reusing a runtime result across channels.
2. Run the crawler's live CLI with the release checkout selected by `--repo` and `--obsidian-version=1.14.4` to establish the runtime baseline.
3. Bundle the actual `getSearchMatcherGuards.ts` implementation with esbuild and evaluate it inside an isolated 1.14.4 application using the integration harness. Create a temporary leaf, compile independent queries for all 13 kinds, and assert the full 13 by 13 predicate matrix: only the corresponding predicate accepts each sample. Use different literals, ignore-case instead of match-case, and less-than instead of greater-than for the independent samples.
4. Assert that each predicate rejects an object whose prototype is the sample instance. Assert all predicates reject `line:`, `block:`, `section:`, `task:` and a boolean property-value child. This checks unknown/subclass behavior as well as positive identification.
5. Check the queue's initial null state, the identity of the queue returned by `start`, and both the cleared active reference and cancelled runnable after `stop`. Dispose the temporary leaf and owned application in `finally`.
6. Run the crawler's `runtimeHarvest` over the view and concrete matcher samples. Resolve each explicit interface from the target compiler program, and use the crawler's `membersOfType` to compare every observed instance and prototype member. All 13 matcher samples and `SearchQueueComponent` passed on both declaration streams. Generic path voting can attribute the queue to its exported base `Component`; selecting the specific interface avoids reporting that base attribution as a queue defect.
7. Run the full `npm run build` on each stream, including lint, spellcheck, format checking, strict source/bundle validation, API Extractor and all seven bundled consumer scenarios. Both must pass before landing.

The live matrix first exposed an incorrect comparison probe that sampled the property root. Selecting its `value` made the full matrix pass, including the reverse rejection of a property node by the comparison guard. The broad crawler also reported unrelated pre-existing surface discrepancies; those require separate runtime triage and are not evidence that this focused surface failed.

Case behavior remains core's `gm`/`gmi` regular-expression matching, without Unicode mode. This report does not validate a trigram fold, a candidate-set algorithm or a Search lifecycle patch. Those require their own result-parity and multi-pane integration tests.

## Later source landmarks retained from the investigation

The original public 1.14.5 source named the queue component Gj at line 117706 and the parser/tokenizer/query constructors CL / gL / NL. Catalyst 1.15.0 named the queue component tf at line 99809 and the parser/tokenizer/query constructors jO / GO / Sr. These are tagged source landmarks only, never runtime discriminants. The fuller candidate-hook constraints remain in the Indexed Search project's source map.
