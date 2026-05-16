import { loadPrism as loadPrismOriginal } from 'obsidian';

import type { PrismModule } from '../../../prismjs/internals/PrismModule.d.ts';

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
export async function loadPrism(): Promise<PrismModule> {
  return (await loadPrismOriginal()) as PrismModule;
}
