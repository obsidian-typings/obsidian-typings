/**
 * Color attributes.
 *
 * @public
 * @unofficial
 */
export interface GraphColorAttributes {
    /** Alpha channel. */
    a: number;

    /** Color stored as an integer (`rgb = c.r << 16 | c.g << 8 | c.b` where channels are 8-bits unsigned integers). */
    rgb: number;
}
