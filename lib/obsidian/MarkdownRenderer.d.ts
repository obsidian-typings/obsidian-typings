/** @todo Documentation incomplete */
export default interface MarkdownRenderer {
    get path(): unknown;
    onCheckboxClick(e: unknown, n: unknown, i: unknown): unknown;
    onFileChange(e: unknown): unknown;
    onFoldChange(): unknown;
    onload(): void;
    onRenderComplete(): unknown;
    onScroll(): unknown;
    postProcess(e: unknown, t: unknown, n: unknown): unknown;
    resolveLinks(e: unknown): unknown;
}
