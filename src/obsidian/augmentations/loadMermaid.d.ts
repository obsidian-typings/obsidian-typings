import type { Mermaid } from 'mermaid';

export {};

declare module 'obsidian' {
    function loadMermaid(): Promise<Mermaid>;
}
