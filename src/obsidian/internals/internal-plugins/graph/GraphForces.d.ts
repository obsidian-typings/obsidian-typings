/**
 * Graph forces.
 *
 * @public
 * @unofficial
 */
export interface GraphForces {
    /** Strength of the force pulling nodes toward the center of the graph. */
    centerStrength?: number;

    /** Ideal distance between linked nodes. */
    linkDistance?: number;

    /** Strength of the attractive force between linked nodes. */
    linkStrength?: number;

    /** Strength of the repulsive force pushing nodes apart. */
    repelStrength?: number;
}
