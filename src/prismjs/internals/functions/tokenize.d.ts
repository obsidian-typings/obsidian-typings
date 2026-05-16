import type { Grammar } from '../Grammar.d.ts';
import type { PrismToken } from '../PrismToken.d.ts';

/**
 * Tokenizes a string of code using the given grammar.
 *
 * @param text - The code string to tokenize.
 * @param grammar - The grammar to use for tokenization.
 * @returns An array of strings and tokens.
 * @public
 * @unofficial
 */
export declare function tokenize(text: string, grammar: Grammar): Array<PrismToken | string>;
