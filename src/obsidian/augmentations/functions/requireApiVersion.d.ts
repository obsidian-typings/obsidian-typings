export {};

declare module 'obsidian' {
  /**
   * Returns `true` if the API version is equal or higher than the requested version.
   * Use this to limit export functionality that require specific API versions to avoid
   * crashing on older Obsidian builds.
   *
   * @param version - The version to check against.
   * @returns `true` if the API version is equal or higher than the requested version.
   *
   * @example
   * ```ts
   * console.log(requireApiVersion('1.8.9')); // true
   * ```
   *
   * @official
   */

  export function requireApiVersion(version: string): boolean;
}
