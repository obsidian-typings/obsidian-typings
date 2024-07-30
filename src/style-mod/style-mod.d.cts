/**
 * @see Original module
 * {@link https://github.com/marijnh/style-mod/blob/master/src/style-mod.d.ts}
 * {@link file://./../../node_modules/style-mod/src/style-mod.d.ts}
 * @note this is a fix for error
 * node_modules/@codemirror/view/dist/index.d.cts:3:40 - error TS7016: Could not find a declaration file for module 'style-mod'. 'F:/dev/projects/obsidian-typings/node_modules/style-mod/dist/style-mod.cjs' implicitly has an 'any' type.
 * If the 'style-mod' package actually exposes this module, try adding a new declaration (.d.ts) file containing `declare module 'style-mod';`
 * import { StyleModule, StyleSpec } from 'style-mod';
 * 
 * @note `export {}` added intentionally.
 * @note in {@link file://./style-mod.cts} it is omitted.
 */

export {};

declare module "style-mod" {
    export type StyleModule = {};
    export type StyleSpec = {};
}
