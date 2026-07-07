export {};

declare module '@codemirror/state' {
  interface SelectionRange {
    /**
     * The anchor of the range—the side that doesn't move when you extend it.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link anchor} instead.
     */
    readonly anchor__?: number;

    /**
     * If this is a cursor that is explicitly associated with the character on one of its sides,
     * this returns the side. -1 means the character before its position, 1 the character after,
     * and 0 means no association.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link assoc} instead.
     */
    readonly assoc__?: -1 | 0 | 1;

    /**
     * The bidirectional text level associated with this cursor, if any.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link bidiLevel} instead.
     */
    readonly bidiLevel__?: null | number;

    /**
     * True when `anchor` and `head` are at the same position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link empty} instead.
     */
    readonly empty__?: boolean;

    /**
     * The lower boundary of the range.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link from} instead.
     */
    readonly from__?: number;

    /**
     * The goal column (stored vertical offset) associated with a cursor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link goalColumn} instead.
     */
    readonly goalColumn__?: number | undefined;

    /**
     * The head of the range, which is moved when the range is extended.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link head} instead.
     */
    readonly head__?: number;

    /**
     * The upper boundary of the range.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link to} instead.
     */
    readonly to__?: number;

    /**
     * Compare this range to another range.
     *
     * @param other - The other range.
     * @param includeAssoc - Whether to compare association.
     * @returns Whether the ranges are equal.
     * @official
     */
    eq(other: SelectionRange, includeAssoc?: boolean): boolean;

    /**
     * Extend this range to cover at least `from` to `to`.
     *
     * @param from - The start position.
     * @param to - The end position.
     * @returns The extended selection range.
     * @official
     */
    extend(from: number, to?: number): SelectionRange;

    /**
     * Map this range through a change, producing a valid range in the updated document.
     *
     * @param change - The change description.
     * @param assoc - Which side the position is associated with.
     * @returns The mapped selection range.
     * @official
     */
    map(change: ChangeDesc, assoc?: number): SelectionRange;

    /**
     * Return a JSON-serializable object representing the range.
     *
     * @returns The JSON representation.
     * @official
     */
    toJSON(): unknown;
  }

  namespace SelectionRange {
    /**
     * Convert a JSON representation of a range to a {@link SelectionRange} instance.
     *
     * @param json - The JSON representation.
     * @returns The deserialized selection range.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link SelectionRange.fromJSON} instead.
     */
    function fromJSON__(json: unknown): SelectionRange;
  }
}
