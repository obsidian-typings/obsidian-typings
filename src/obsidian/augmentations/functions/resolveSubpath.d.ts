import type {
  BlockSubpathResult,
  CachedMetadata,
  FootnoteSubpathResult,
  HeadingSubpathResult
} from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Resolve the given subpath to a reference in the MetadataCache.
   *
   * @param cache - The cached metadata to resolve the subpath in.
   * @param subpath - The subpath to resolve.
   * @returns The resolved subpath or `null` if the subpath is not found.
   *
   * @example
   * ```ts
   * console.log(resolveSubpath(cache, '#foo'));
   * ```
   *
   * @official
   */

  export function resolveSubpath(
    cache: CachedMetadata,
    subpath: string
  ): BlockSubpathResult | FootnoteSubpathResult | HeadingSubpathResult | null;
}
