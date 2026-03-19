export {};

declare module 'obsidian' {
  /**
   * Parses a YAML string into an object.
   *
   * @param yaml - The YAML string to parse.
   * @returns The parsed object.
   *
   * @example
   * ```ts
   * console.log(parseYaml('foo: bar')); // { foo: 'bar' }
   * ```
   *
   * @official
   */

  export function parseYaml(yaml: string): unknown;
}
