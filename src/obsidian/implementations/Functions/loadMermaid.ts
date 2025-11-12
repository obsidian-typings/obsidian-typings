import type { Mermaid } from 'mermaid' with { 'resolution-mode': 'import' };
import { loadMermaid as loadMermaidOriginal } from 'obsidian';

/**
 * Load Mermaid and return a promise to the global mermaid object.
 * Can also use {@link Window.mermaid} after this promise resolves to get the same reference.
 *
 * @returns A promise that resolves to the global {@link Window.mermaid} object.
 *
 * @see {@link https://mermaid.js.org/ Official Mermaid documentation}.
 */
export async function loadMermaid(): Promise<Mermaid> {
    return (await loadMermaidOriginal()) as Mermaid;
}
