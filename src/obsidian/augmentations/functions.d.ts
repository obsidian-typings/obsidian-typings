import type { Mermaid } from 'mermaid';
import type { default as pdfjsLib } from 'pdfjs-dist';
import type { default as Prism } from 'prismjs';

export {};

declare module 'obsidian' {
    export function loadMermaid(): Promise<Mermaid>;

    export function loadPdfJs(): Promise<typeof pdfjsLib>;

    export function loadPrism(): Promise<typeof Prism>;
}
