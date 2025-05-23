import type { Outline } from './Outline.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export declare class HighlightOutline extends Outline {
    /** @todo Documentation incomplete. */
    constructor(outlines: unknown, box: unknown, lastPoint: any);

    /** @todo Documentation incomplete. */
    lastPoint: unknown;

    /** @todo Documentation incomplete. */
    get box(): Object | null;

    /** @todo Documentation incomplete. */
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
