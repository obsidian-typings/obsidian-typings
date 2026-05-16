import type { RangeSet } from '../../@codemirror__state/internals/RangeSet.d.ts';
import type { Decoration } from './Decoration.d.ts';

/**
 * A set of decorations, stored as a range set.
 *
 * @public
 * @unofficial
 */
export type DecorationSet = RangeSet<Decoration>;
