export {};

declare module 'obsidian' {
  /**
   * If callback returns `true`, the iteration process will be interrupted.
   *
   * @param refs - The references to iterate.
   * @param cb - The callback to call for each reference.
   * @returns `true` if callback ever returns `true`, `false` otherwise.
   *
   * @example
   * ```ts
   * iterateRefs(refs, (ref) => {
   *     console.log(ref);
   *     return true;
   * });
   * @official
   */

  export function iterateRefs(refs: Reference[], cb: (ref: Reference) => boolean | void): boolean;
}
