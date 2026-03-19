export {};

declare module 'obsidian' {
  /**
   * Stringify a YAML object.
   *
   * @param obj - The object to stringify.
   * @returns The stringified object.
   *
   * @example
   * ```ts
   * console.log(stringifyYaml({ foo: 'bar' })); // foo: bar
   * ```
   *
   * @official
   */

  export function stringifyYaml(obj: unknown): string;
}
