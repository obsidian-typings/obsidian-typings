import type { Mermaid } from 'mermaid';
import type { default as pdfjsLib } from 'pdfjs-dist';
import type { default as Prism } from 'prismjs';

export {};

declare module 'obsidian' {
    /**
     * Load Mermaid.
     *
     * @unofficial
     */
    export function loadMermaid(): Promise<Mermaid>;
    /**
     * Load PDF.js.
     *
     * @unofficial
     */
    export function loadPdfJs(): Promise<typeof pdfjsLib>;
    /**
     * Load Prism.
     *
     * @unofficial
     */
    export function loadPrism(): Promise<typeof Prism>;
}
