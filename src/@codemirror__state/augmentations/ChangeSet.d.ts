import type {
  ChangeSpec,
  Text
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  interface ChangeSet {
    /**
     * Get a change description for this change set.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link desc} instead.
     */
    readonly desc__?: ChangeDesc;

    /**
     * Apply the changes to a document, returning the modified document.
     *
     * @param doc - The document to apply changes to.
     * @returns The modified document.
     * @official
     */
    apply(doc: Text): Text;

    /**
     * Combine two subsequent change sets into a single set.
     *
     * @param other - The change set to compose with.
     * @returns The composed change set.
     * @official
     */
    compose(other: ChangeSet): ChangeSet;

    /**
     * Given the document as it existed before the changes, return a change set
     * that represents the inverse of this set.
     *
     * @param doc - The original document.
     * @returns The inverted change set.
     * @official
     */
    invert(doc: Text): ChangeSet;

    /**
     * Iterate over the changed ranges in the document.
     *
     * @param f - Callback receiving fromA, toA, fromB, toB, and inserted text.
     * @param individual - Whether adjacent changes are reported separately.
     * @official
     */
    iterChanges(f: (fromA: number, toA: number, fromB: number, toB: number, inserted: Text) => void, individual?: boolean): void;

    /**
     * Given another change set starting in the same document, maps this change set over the other.
     *
     * @param other - The other change description.
     * @param before - Whether to order as if this comes before other.
     * @returns The mapped change set.
     * @official
     */
    map(other: ChangeDesc, before?: boolean): ChangeSet;

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
     * Serialize this change set to a JSON-representable value.
     *
     * @returns The JSON representation.
     * @official
     */
    toJSON(): unknown;
  }

  namespace ChangeSet {
    /**
     * Create a change set for the given changes, for a document of the given length.
     *
     * @param changes - The change spec.
     * @param length - The document length.
     * @param lineSep - The line separator.
     * @returns The created change set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ChangeSet.of} instead.
     */
    function of__(changes: ChangeSpec, length: number, lineSep?: string): ChangeSet;

    /**
     * Create an empty changeset of the given length.
     *
     * @param length - The document length.
     * @returns The empty change set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ChangeSet.empty} instead.
     */
    function empty__(length: number): ChangeSet;

    /**
     * Create a changeset from its JSON representation.
     *
     * @param json - The JSON representation.
     * @returns The deserialized change set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ChangeSet.fromJSON} instead.
     */
    function fromJSON__(json: unknown): ChangeSet;
  }
}
