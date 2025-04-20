/**
 * @public
 * @unofficial
 */
export declare class Outline {
    static PRECISION: number;

    /**
     * The bounding box of the outline.
     *
     * @returns The bounding box of the outline.
     */
    get box(): Object | null;

    serialize(bbox: [blX: string, blY: string, trX: string, trY: string], rotation: number): void;
    static _normalizePagePoint(x: unknown, y: unknown, rotation: unknown): unknown[];
    static _normalizePoint(
        x: unknown,
        y: unknown,
        parentWidth: unknown,
        parentHeight: unknown,
        rotation: unknown
    ): number[];
    static _rescale(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;
    static _rescaleAndSwap(src: unknown, tx: unknown, ty: unknown, sx: unknown, sy: unknown, dest: unknown): unknown;
    static _translate(src: unknown, tx: unknown, ty: unknown, dest: unknown): unknown;
    static createBezierPoints(x1: unknown, y1: unknown, x2: unknown, y2: unknown, x3: unknown, y3: unknown): number[];
    static svgRound(x: unknown): number;
    /**
     * Converts the outline to an SVG path.
     *
     * @returns The SVG path of the outline.
     */
    toSVGPath(): string;
}
