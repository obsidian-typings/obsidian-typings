export {};

declare module 'obsidian' {
    interface MarkdownPreviewSection {
        computed: boolean;
        el: HTMLDivElement;
        headingCollapsed: boolean;
        height: number;
        highlightRanges: null;
        html: string;
        level: number;
        lineEnd: number;
        lines: number;
        lineStart: number;
        rendered: boolean;
        shown: boolean;
        used: boolean;
        usesFrontMatter: boolean;

        render(): void;
        resetCompute(): void;
        setCollapsed(collapsed: boolean): void;
    }
}
