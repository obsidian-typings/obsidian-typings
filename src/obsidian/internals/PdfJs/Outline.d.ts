/**
 * Represents an SVG outline path for PDF annotations.
 * @public
 * @unofficial
 */
export declare class Outline {
    /** Number of decimal places used when rounding SVG coordinates. */
    static PRECISION: number;

    /**
     * The bounding box of the outline.
     *
     * @returns The bounding box of the outline.
     */
    get box(): Object | null;

    /** Serialize the outline into the PDF page coordinate system. */
    serialize(bbox: [blX: string, blY: string, trX: string, trY: string], rotation: number): void;

    /** Normalize a point relative to the page with the given rotation. */
    static _normalizePagePoint(x: unknown, y: unknown, rotation: unknown): unknown[];

    /** Normalize a point relative to a parent element with the given dimensions and rotation. */
    static _normalizePoint(
        x: unknown,
        y: unknown,
        parentWidth: unknown,
        parentHeight: unknown,
        rotation: unknown
    ): number[];

    /** Rescale coordinates by translation and scale factors. */
    static _rescale(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;

    /** Rescale and swap coordinates by translation and scale factors. */
    static _rescaleAndSwap(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;

    /** Translate coordinates by the given offsets. */
    static _translate(src: unknown, tx: unknown, ty: unknown, dest: unknown): unknown;

    /** Create cubic bezier control points between two endpoints. */
    static createBezierPoints(x1: unknown, y1: unknown, x2: unknown, y2: unknown, x3: unknown, y3: unknown): number[];

    /** Round a number to the configured SVG precision. */
    static svgRound(x: unknown): number;

    /**
     * Converts the outline to an SVG path.
     *
     * @returns The SVG path of the outline.
     */
    toSVGPath(): string;
}
