import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';

/**
 * Group of nodes set by the user.
 *
 * @public
 * @unofficial
 */
export interface GraphColorGroup {
    /** Color associated to the group. */
    color: GraphColorAttributes;

    /** Query associated to the group. */
    query: string;
}
