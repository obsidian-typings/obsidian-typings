import { loadPrism as loadPrismOriginal } from 'obsidian';
import type { default as Prism } from 'prismjs';

/**
 * Load Prism.js and return a promise to the global Prism object.
 * Can also use `window.Prism` after this promise resolves to get the same reference.
 *
 * @returns A promise that resolves to the global `window.Prism` object.
 *
 * @see {@link https://prismjs.com/ | Official Prism documentation}.
 * @public
 * @unofficial
 */
export async function loadPrism(): Promise<typeof Prism> {
    return (await loadPrismOriginal()) as typeof Prism;
}
