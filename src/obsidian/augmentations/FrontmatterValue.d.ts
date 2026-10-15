export {};

declare module 'obsidian' {
  /**
   * All possible types that can be emitted from parsing or writing to frontmatter.
   *
   * @deprecated - Added only for typing purposes. Use {@link FrontmatterValue} instead.
   */
  type FrontmatterValue__ =
    | {
      [key: string]: FrontmatterValue;
    }
    | boolean
    | FrontmatterValue[]
    | null
    | number
    | string
    | undefined;
}
