import type { FileStats } from 'obsidian';

/** @public @unofficial */
export interface CapacitorFileEntry extends Partial<FileStats> {
    name: string;
    type: 'file' | 'directory';
    uri: string;
}
