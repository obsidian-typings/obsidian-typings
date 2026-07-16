/**
 * A string-literal type `T` that still accepts any other `string`.
 *
 * The `& Record<never, never>` on the `string` arm keeps the literal members of `T` visible for editor
 * autocomplete (they are not collapsed into `string`), while the whole union stays assignable-compatible
 * with `string`. This lets a member typed as `LiteralStringUnion<T>` be overridden by a subclass that
 * returns a plain `string` — a bare `T` (e.g. `'markdown'`) could not, since `string` is not assignable to
 * a narrower literal.
 *
 * @typeParam T - The string-literal type to keep visible.
 *
 * @example
 * ```ts
 * // Accepts `'markdown'` (with autocomplete) or any other string:
 * type ViewTypeName = LiteralStringUnion<'markdown'>;
 * ```
 *
 * @public
 * @unofficial
 */
export type LiteralStringUnion<T extends string> = (Record<never, never> & string) | T;
