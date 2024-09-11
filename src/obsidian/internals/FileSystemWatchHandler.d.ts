import type { FileStats } from 'obsidian';

/** @public */
export type FileSystemWatchHandler = (eventType: string, path: string, oldPath?: string, stats?: FileStats) => void;
