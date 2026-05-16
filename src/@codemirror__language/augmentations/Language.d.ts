import type {
  StateEffectType,
  StateField
} from '@codemirror/state';

import type { LanguageState } from '../internals/LanguageState.d.ts';

export {};

declare module '@codemirror/language' {
  namespace Language {
    /**
     * State effect type used to replace the current language state.
     *
     * @unofficial
     */
    const setState: StateEffectType<LanguageState>;

    /**
     * State field holding the current language parse state and tree.
     *
     * @unofficial
     */
    const state: StateField<LanguageState>;
  }
}
