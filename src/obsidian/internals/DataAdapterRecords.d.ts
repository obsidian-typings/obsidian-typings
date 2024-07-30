import type { FileEntry } from "./FileEntry.js";

export interface DataAdapterFilesRecord extends Record<string, FileEntry> {}
export interface DataAdapterWatchersRecord extends Record<string, { resolvedPath: string; watcher: unknown }> {}
