import type { TAbstractFile } from 'obsidian';

/** @public */
export interface Draggable {
    file?: TAbstractFile;
    files?: TAbstractFile[];
    icon: string;
    linktext?: string;
    source?: unknown;
    sourcePath?: string;
    title: string;
    type: string;
}
