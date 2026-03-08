import type {
    TFile,
    Vault,
    Workspace
} from 'obsidian';
import type { GetRecentFilesOptions } from './GetRecentFilesOptions.d.ts';

/**
 * Tracks recently opened files for quick access and navigation.
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

    /**
     * Add a file to the recent files list.
     *
     * @param file - File to add.
     */
    collect(file: TFile): void;

    /**
     * Constructor.
     *
     * @param workspace - The workspace.
     * @param vault - The vault.
     * @returns The new instance.
     * To get the constructor, use `getRecentFileTrackerConstructor()` from `obsidian-typings/implementations`.
     * @deprecated - Added only for typing purposes.
     */
    constructor__(workspace: Workspace, vault: Vault): this;

    /**
     * Returns the last 10 opened files.
     *
     * @returns Array of file paths.
     */
    getLastOpenFiles(): string[];

    /**
     * Get last n files of type (defaults to 10).
     *
     * @param options - Options for filtering recent files.
     * @returns Array of file paths.
     */
    getRecentFiles(options?: GetRecentFilesOptions): string[];

    /**
     * Set the last opened files.
     *
     * @param savedFiles - Array of file paths to load.
     */
    load(savedFiles: string[]): void;

    /**
     * On file create, save file to last opened files.
     *
     * @param file - The created file.
     */
    onFileCreated(file: TFile): void;

    /**
     * On file open, save file to last opened files.
     *
     * @param prevFile - Previously opened file.
     * @param file - Newly opened file.
     */
    onFileOpen(prevFile: TFile, file: TFile): void;

    /**
     * On file rename, update file path in last opened files.
     *
     * @param file - The renamed file.
     * @param oldPath - Previous file path.
     */
    onRename(file: TFile, oldPath: string): void;

    /**
     * Get last opened files.
     *
     * @returns Array of file paths.
     */
    serialize(): string[];
}
