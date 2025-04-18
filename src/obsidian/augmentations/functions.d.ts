import type { Mermaid } from 'mermaid';
import type { default as pdfjsLib } from 'pdfjs-dist';
import type { default as Prism } from 'prismjs';

export {};

declare module 'obsidian' {
    function loadMermaid(): Promise<Mermaid>;
    function loadPdfJs(): Promise<typeof pdfjsLib>;
    function loadPrism(): Promise<typeof Prism>;
}
