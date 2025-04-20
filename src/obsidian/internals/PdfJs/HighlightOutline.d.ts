import type { Outline } from './Outline.js';

/**
 * @public
 * @unofficial
 */
export declare class HighlightOutline extends Outline {
    constructor(outlines: unknown, box: unknown, lastPoint: any);
    lastPoint: unknown;

    get box(): Object | null;
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
