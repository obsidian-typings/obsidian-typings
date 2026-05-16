import type { PrismToken } from './PrismToken.d.ts';

/**
 * A token stream: a string, a single token, or an array of strings and tokens.
 *
 * @public
 * @unofficial
 */
export type PrismTokenStream = Array<PrismToken | string> | PrismToken | string;
