import type { ParseContext } from '@codemirror/language';
import type {
    EditorState,
    Transaction
} from '@codemirror/state';
import type { Tree } from '@lezer/common';

/**
 * @see https://github.com/codemirror/language/blob/main/src/language.ts
 * @todo Documentation incomplete.
 * @unofficial
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
    tree: Tree;

    /** @todo Documentation incomplete. */
    apply(tr: Transaction): LanguageState;
}
