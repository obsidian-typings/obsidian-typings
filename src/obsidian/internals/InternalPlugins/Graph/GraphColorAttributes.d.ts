/**
 * Interface for the colors used by the Graph plugin.
 * 
 * @public
 * @unofficial
 */
export interface GraphColorAttributes {
    /** Alpha. */
    a: number;

    /** Color stored as a int (`rgb = c.r << 16 | c.g << 8 | c.b` where channels are 8-bits unsigned integers). */
    rgb: number;
}
