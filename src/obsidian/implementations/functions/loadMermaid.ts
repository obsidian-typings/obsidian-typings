import { loadMermaid as loadMermaidOriginal } from 'obsidian';

import type { Mermaid } from '../../../mermaid/internals/Mermaid.d.ts';

/**
 * Load Mermaid and return a promise to the global mermaid object.
 * Can also use `window.mermaid` after this promise resolves to get the same reference.
 *
 * @returns A promise that resolves to the global `window.mermaid` object.
 *
 * @see {@link https://mermaid.js.org/ | Official Mermaid documentation}.
 * @public
 * @unofficial
 */
export async function loadMermaid(): Promise<Mermaid> {
  return (await loadMermaidOriginal()) as Mermaid;
}
