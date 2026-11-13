/**
 * Scenario 16: none of `@codemirror/language`, `@codemirror/search` or `@lezer/common` is installed.
 *
 * Obsidian exposes all three at the editor boundaries, but the default bundles must not need them:
 * they carry standalone mirrors, and only the opt-in `obsidian-typings/lezer` subpath selects the
 * real types (scenarios 8 and 9). Scenario 1 never tested this, because the packages used to be
 * required peers, which npm installs beside a `file:` dependency. Checked with
 * `skipLibCheck: false` and `types: []`, so an unresolvable import in a bundle is a `TS2307` here
 * rather than a silent `any`.
 */

import type {
  CodeMirrorEditor,
  InteropLezerTree,
  InteropParseContext,
  InteropSearchQuery,
  InteropStringNodeProp,
  LanguageState,
  LezerTree,
  NodeProp,
  ParseContext,
  SearchQuery
} from 'obsidian-typings';

import 'obsidian-typings';

// The premise: none of the three packages resolves in this scenario. If one starts resolving
// (a new peer, a dependency of `obsidian`), these directives fail and the scenario stops proving anything.
// @ts-expect-error -- `@lezer/common` must not be installed here.
import type {} from '@lezer/common';
// @ts-expect-error -- `@codemirror/search` must not be installed here.
import type {} from '@codemirror/search';

declare const languageState: LanguageState;
declare const editor: CodeMirrorEditor;

// Without the integration, every boundary selects the standalone mirror.
const tree: LezerTree = languageState.tree;
const context: ParseContext = languageState.context;
const query: SearchQuery | undefined = editor.addOverlay({ query: /test/ });
editor.removeOverlay(query);
declare const tokenProp: InteropStringNodeProp;
const mirrorProp: NodeProp<string> = tokenProp;
void [tree, context, query, mirrorProp];

// And none of them has degraded to `any`, which is what a missing upstream import looks like under `skipLibCheck: true`.
type IsAny<T> = 0 extends (1 & T) ? true : false;
const treeHasType: IsAny<InteropLezerTree> = false;
const contextHasType: IsAny<InteropParseContext> = false;
const queryHasType: IsAny<InteropSearchQuery> = false;
const propHasType: IsAny<InteropStringNodeProp> = false;
void [treeHasType, contextHasType, queryHasType, propHasType];
