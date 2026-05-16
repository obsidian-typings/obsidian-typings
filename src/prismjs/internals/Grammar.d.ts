import type { GrammarRest } from './GrammarRest.d.ts';
import type { GrammarValue } from './GrammarValue.d.ts';

/**
 * A Prism grammar definition, combining common token names with arbitrary additional tokens.
 *
 * @public
 * @unofficial
 */
export type Grammar = GrammarRest & Record<string, GrammarValue>;
