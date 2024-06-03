/**
 * @note non-existing `.ts` references are used, instead of existing `.d.ts`,
 * because `.d.ts` can be used only with `export type`,
 * and wildcards `export type * from` are not supported
 */
export * from "./@codemirror__view/types.ts";
export * from "./global/types.ts";
export * from "./obsidian/types.ts";
