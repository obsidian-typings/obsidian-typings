import type * as pdfjsLib from 'pdfjs-dist';

export {};

declare module 'obsidian' {
    function loadPdfJs(): Promise<typeof pdfjsLib>;
}
