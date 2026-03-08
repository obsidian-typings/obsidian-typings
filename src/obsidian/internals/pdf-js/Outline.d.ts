/**
 * Represents an SVG outline path for PDF annotations.
 * @public
 * @unofficial
 */
export declare class Outline {
    /** Number of decimal places used when rounding SVG coordinates. */
    static PRECISION: number;

    /**
     * Normalize a point relative to the page with the given rotation.
     *
     * @returns The normalized point coordinates.
     */
    static _normalizePagePoint(x: unknown, y: unknown, rotation: unknown): unknown[];

    /**
     * Normalize a point relative to a parent element with the given dimensions and rotation.
     *
     * @returns The normalized point coordinates.
     */
    static _normalizePoint(
        x: unknown,
        y: unknown,
        parentWidth: unknown,
        parentHeight: unknown,
        rotation: unknown
    ): number[];

    /**
     * Rescale coordinates by translation and scale factors.
     *
     * @returns The rescaled coordinates.
     */
    static _rescale(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;

    /**
     * Rescale and swap coordinates by translation and scale factors.
     *
     * @returns The rescaled and swapped coordinates.
     */
    static _rescaleAndSwap(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;

    /**
     * Translate coordinates by the given offsets.
     *
     * @returns The translated coordinates.
     */
    static _translate(src: unknown, tx: unknown, ty: unknown, dest: unknown): unknown;

    /**
     * The bounding box of the outline.
     *
     * @returns The bounding box of the outline.
     */
    get box(): Object | null;

    /**
     * Create cubic bezier control points between two endpoints.
     *
     * @returns The bezier control point coordinates.
     */
    static createBezierPoints(x1: unknown, y1: unknown, x2: unknown, y2: unknown, x3: unknown, y3: unknown): number[];

    /**
     * Serialize the outline into the PDF page coordinate system.
     *
     * @param bbox - The bounding box as bottom-left and top-right coordinates.
     * @param rotation - The page rotation in degrees.
     */
    serialize(bbox: [blX: string, blY: string, trX: string, trY: string], rotation: number): void;

    /**
     * Round a number to the configured SVG precision.
     *
     * @returns The rounded number.
     */
    static svgRound(x: unknown): number;

    /**
     * Converts the outline to an SVG path.
     *
     * @returns The SVG path of the outline.
     */
    toSVGPath(): string;
}
