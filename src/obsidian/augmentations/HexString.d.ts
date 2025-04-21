export {};

declare module 'obsidian' {
    /**
     * Hex strings are 6-digit hash-prefixed rgb strings in lowercase form.
     *
     * @example
     * ```ts
     * const hexString: HexString = '#ffffff';
     * ```
     *
     * @deprecated - Added only for typing purposes. Use {@link HexString} instead.
     */
    type HexString__ = string;
}
