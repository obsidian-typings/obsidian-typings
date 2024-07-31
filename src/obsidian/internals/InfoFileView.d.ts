import type { FileView } from "obsidian";
/**
 * @todo This is probably not the right term
 * @todo Documentation incomplete
 */
export interface InfoFileView extends FileView {
    /** @internal */
    onFileOpen(e: unknown): void;
}
