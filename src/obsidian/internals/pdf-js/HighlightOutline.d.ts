import type { Outline } from './Outline.d.ts';

/**
 * Outline representing a PDF text highlight annotation.
 * @public
 * @unofficial
 */
export declare class HighlightOutline extends Outline {
    /** The last point of the highlight used for directional calculations. */
    lastPoint: unknown;

    /** Create a highlight outline from the given outlines, bounding box, and last point. */
    constructor(outlines: unknown, box: unknown, lastPoint: any);

    /**
     * The bounding box of the highlight outline.
     *
     * @returns The bounding box, or `null`.
     */
    get box(): Object | null;

    /**
     * CSS class names applied when outlining this highlight.
     *
     * @returns The class names for outlining.
     */
    get classNamesForOutlining(): string[];

    /**
     * Serialize the outlines into the PDF page coordinate system.
     *
     * @param bbox - the bounding box of the annotation.
     * @param rotation - the rotation of the annotation.
     * @returns Serialized outlines.
     */
    serialize(bbox: [blX: string, blY: string, trX: string, trY: string], rotation: number): Array<Array<number>>;
}
