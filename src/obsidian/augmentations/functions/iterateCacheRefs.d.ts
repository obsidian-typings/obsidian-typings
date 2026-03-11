import type {
  CachedMetadata,
  ReferenceCache
} from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * Iterate links and embeds.
   * If callback returns `true`, the iteration process will be interrupted.
   *
   * @param cache - The cache to iterate.
   * @param cb - The callback to call for each link or embed.
   * @returns `true` if callback ever returns `true`, `false` otherwise.
   *
   * @example
   * ```ts
   * iterateCacheRefs(cache, (ref) => {
   *     console.log(ref);
   *     return true;
   * });
   * @official
   * @deprecated - Use {@link iterateRefs} instead.
   */

  export function iterateCacheRefs(cache: CachedMetadata, cb: (ref: ReferenceCache) => boolean | void): boolean;
}
