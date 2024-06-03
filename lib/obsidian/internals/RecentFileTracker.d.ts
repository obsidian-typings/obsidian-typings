import type {
    TFile,
    Vault,
    Workspace
} from "obsidian";

export default interface RecentFileTracker {
    /**
     * List of last opened file paths, limited to 50
     */
    lastOpenFiles: string[];
    /**
     * Reference to Vault
     */
    vault: Vault;
    /**
     * Reference to Workspace
     */
    workspace: Workspace;

    /** @internal */
    collect(file: TFile): void;
    /**
     * Returns the last 10 opened files
     */
    getLastOpenFiles(): string[];
    /**
     * Get last n files of type (defaults to 10)
     */
    getRecentFiles(arg?: {
        showMarkdown: boolean;
        showCanvas: boolean;
        showNonImageAttachments: boolean;
        showImages: boolean;
        maxCount: number;
    }): string[];
    /**
     * Set the last opened files
     */
    load(savedFiles: string[]): void;
    /** @internal On file create, save file to last opened files */
    onFileCreated(file: TFile): void;
    /** @internal On file open, save file to last opened files */
    onFileOpen(prevFile: TFile, file: TFile): void;
    /** @internal On file rename, update file path in last opened files */
    onRename(file: TFile, oldPath: string): void;
    /** @internal Get last opened files */
    serialize(): string[];
}
