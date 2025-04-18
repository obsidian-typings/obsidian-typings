import type { default as Prism } from 'prismjs';

export {};

declare module 'obsidian' {
    function loadPrism(): Promise<typeof Prism>;
}
