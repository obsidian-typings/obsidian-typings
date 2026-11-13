import type { Transaction } from '@codemirror/state';

import type { InteropLezerTree } from '../../@lezer__common/interop/InteropLezerTree.d.ts';
import type { InteropParseContext } from '../interop/InteropParseContext.d.ts';

/**
 * Internal state for a language's parser, tracking the parse tree and context.
 *
 * @see {@link https://github.com/codemirror/language/blob/main/src/language.ts}
 * @unofficial
 * @public
 */
export interface LanguageState {
  /**
   * A mutable parse state that is used to preserve work done during
   * the lifetime of a state when moving to the next state.
   */
  context: InteropParseContext;

  /**
   * The current tree. Immutable, because directly accessible from the editor state.
   */
  tree: InteropLezerTree;

  /**
   * Apply a transaction to produce an updated language state.
   *
   * @param tr - The transaction to apply.
   * @returns The updated language state.
   */
  apply(tr: Transaction): LanguageState;
}
