import type { PrismTokenObject } from './PrismTokenObject.d.ts';

/**
 * A grammar value: a single regex, a token object, or an array of either.
 *
 * @public
 * @unofficial
 */
export type GrammarValue = Array<PrismTokenObject | RegExp> | PrismTokenObject | RegExp;
