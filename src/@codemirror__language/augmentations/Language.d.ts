import type { Language } from '@codemirror/language';
import type {
    StateEffect,
    StateField
} from '@codemirror/state';
import type { LanguageState } from '../internals/LanguageState.d.ts';

export {};

declare module '@codemirror/language' {
    /**
     * A language object manages parsing and per-language
     * [metadata](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt). Parse data is
     * managed as a [Lezer](https://lezer.codemirror.net) tree. The class
     * can be used directly, via the [`LRLanguage`](https://codemirror.net/6/docs/ref/#language.LRLanguage)
     * subclass for [Lezer](https://lezer.codemirror.net/) LR parsers, or
     * via the [`StreamLanguage`](https://codemirror.net/6/docs/ref/#language.StreamLanguage) subclass
     * for stream parsers.
     */
    namespace Language {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        const setState: StateEffect<LanguageState>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        const state: StateField<LanguageState>;
    }
}
