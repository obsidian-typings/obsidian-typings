import type { MapMode } from '../internals/MapMode.d.ts';

export {};

declare module '@codemirror/state' {
  interface ChangeDesc {
    /**
     * False when there are actual changes in this set.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link empty} instead.
     */
    readonly empty__?: boolean;

    /**
     * Get a description of the inverted form of these changes.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link invertedDesc} instead.
     */
    readonly invertedDesc__?: ChangeDesc;

    /**
     * The length of the document before the change.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link length} instead.
     */
    readonly length__?: number;

    /**
     * The length of the document after the change.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link newLength} instead.
     */
    readonly newLength__?: number;

    /**
     * Compute the combined effect of applying another set of changes after this one.
     *
     * @param other - The other change description.
     * @returns The composed change description.
     * @official
     */
    composeDesc(other: ChangeDesc): ChangeDesc;

    /**
     * Iterate over the ranges changed by these changes.
     *
     * @param f - Callback receiving fromA, toA, fromB, toB.
     * @param individual - Whether adjacent changes are reported separately.
     * @official
     */
    iterChangedRanges(f: (fromA: number, toA: number, fromB: number, toB: number) => void, individual?: boolean): void;

    /**
     * Iterate over the unchanged parts left by these changes.
     *
     * @param f - Callback receiving posA, posB, and length.
     * @official
     */
    iterGaps(f: (posA: number, posB: number, length: number) => void): void;

    /**
     * Map this description over another set of changes.
     *
     * @param other - The other change description.
     * @param before - Whether to map as if this happened before other.
     * @returns The mapped change description.
     * @official
     */
    mapDesc(other: ChangeDesc, before?: boolean): ChangeDesc;

    /**
     * Map a given position through these changes.
     *
     * @param pos - The position to map.
     * @param assoc - Which side the position is associated with.
     * @returns The mapped position.
     * @official
     */
    mapPos(pos: number, assoc?: number): number;

    /**
     * Map a given position through these changes with a specific mode.
     *
     * @param pos - The position to map.
     * @param assoc - Which side the position is associated with.
     * @param mode - The mapping mode.
     * @returns The mapped position, or `null` if deleted.
     * @official
     */
    mapPos(pos: number, assoc: number, mode: MapMode): null | number;

    /**
     * Serialize this change desc to a JSON-representable value.
     *
     * @returns The JSON representation.
     * @official
     */
    toJSON(): readonly number[];

    /**
     * Check whether these changes touch a given range.
     *
     * @param from - Start of the range.
     * @param to - End of the range.
     * @returns Whether the range is touched, or "cover" if entirely covered.
     * @official
     */
    touchesRange(from: number, to?: number): 'cover' | boolean;
  }

  namespace ChangeDesc {
    /**
     * Create a change desc from its JSON representation.
     *
     * @param json - The JSON representation.
     * @returns The deserialized change description.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ChangeDesc.fromJSON} instead.
     */
    function fromJSON__(json: unknown): ChangeDesc;
  }
}
