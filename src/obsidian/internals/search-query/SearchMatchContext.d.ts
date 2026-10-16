import type { CachedMetadata } from 'obsidian';

/**
 * The per-file context a search matcher evaluates against.
 *
 * @public
 * @unofficial
 */
export interface SearchMatchContext {
  /**
   * The metadata cache of the file being matched, when it has one.
   */
  cache: CachedMetadata | null | undefined;

  /**
   * Whether the query is matched case-sensitively.
   */
  caseSensitive: boolean;

  /**
   * Values attached to the context by the matchers, or `null` when there are none.
   */
  data: Map<unknown, unknown> | null;

  /**
   * The inputs, by name, that the matchers search: a subset of the keys of {@link SearchMatchContext.strings}.
   */
  keys: string[];

  /**
   * The original text the context was created for.
   */
  original: string;

  /**
   * The input strings by name: `content`, `filename`, `filepath`, `propertyName` or `tag`.
   */
  strings: Record<string, string>;

  /**
   * Copies the context. {@link SearchMatchContext.strings}, {@link SearchMatchContext.keys} and
   * {@link SearchMatchContext.data} are copied; {@link SearchMatchContext.cache} is shared.
   *
   * @returns The copy.
   */
  clone(): SearchMatchContext;

  /**
   * Copies the context for matching a property value, which becomes the only (`content`) input.
   *
   * @param value - The property value.
   * @returns The copy.
   */
  cloneForPropertyContent(value: unknown): SearchMatchContext;

  /**
   * Constructor.
   *
   * @param strings - The input strings by name.
   * @param original - The original text.
   * @param keys - The inputs to search.
   * @param caseSensitive - Whether to match case-sensitively.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(strings: Record<string, string>, original: string, keys: string[], caseSensitive: boolean): this;

  /**
   * Removes a value attached to the context.
   *
   * @param key - The value's key.
   */
  deleteData(key: unknown): void;

  /**
   * Reads a value attached to the context.
   *
   * @param key - The value's key.
   * @returns The value, `undefined` if it is not set, or `null` when the context has no values at all.
   */
  getData(key: unknown): unknown;

  /**
   * Attaches a value to the context.
   *
   * @param key - The value's key.
   * @param value - The value.
   */
  setData(key: unknown, value: unknown): void;
}
