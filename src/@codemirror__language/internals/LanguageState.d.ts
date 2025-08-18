import type { ParseContext } from '@codemirror/language';
import type { Transaction } from '@codemirror/state';
import type { Tree as LezerTree } from '@lezer/common';

/**
 * @see https://github.com/codemirror/language/blob/main/src/language.ts
 * @todo Documentation incomplete.
 * @unofficial
 * @public
 */
export interface LanguageState {
    /**
     * A mutable parse state that is used to preserve work done during
     * the lifetime of a state when moving to the next state.
     */
    context: ParseContext;

    /**
     * The current tree. Immutable, because directly accessible from the editor state.
     */
    tree: LezerTree;

    /** @todo Documentation incomplete. */
    apply(tr: Transaction): LanguageState;
}
