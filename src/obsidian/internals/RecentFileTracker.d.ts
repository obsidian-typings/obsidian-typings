import type {
    TFile,
    Vault,
    Workspace
} from 'obsidian';
import type { GetRecentFilesOptions } from './GetRecentFilesOptions.d.ts';

/**
 * @public
 * @unofficial
 */
export interface RecentFileTracker {
    /**
     * List of last opened file paths, limited to 50.
     */
    lastOpenFiles: string[];

    /**
     * Reference to Vault.
     */
    vault: Vault;

    /**
     * Reference to Workspace.
     */
    workspace: Workspace;

    /** @todo Documentation incomplete. */
    collect(file: TFile): void;

    /**
     * Returns the last 10 opened files.
     */
    getLastOpenFiles(): string[];

    /**
     * Get last n files of type (defaults to 10).
     */
    getRecentFiles(options?: GetRecentFilesOptions): string[];

    /**
     * Set the last opened files.
     */
    load(savedFiles: string[]): void;

    /**
     * On file create, save file to last opened files.
     */
    onFileCreated(file: TFile): void;

    /**
     * On file open, save file to last opened files.
     */
    onFileOpen(prevFile: TFile, file: TFile): void;

    /**
     * On file rename, update file path in last opened files.
     */
    onRename(file: TFile, oldPath: string): void;

    /**
     * Get last opened files.
     */
    serialize(): string[];
}
