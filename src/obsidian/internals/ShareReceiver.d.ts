import type { App } from 'obsidian';
import type { SharedFile } from './SharedFile.d.ts';

/**
 * Handler for receiving shared files and text from other apps on mobile.
 * @public
 * @unofficial
 */
export interface ShareReceiver {
    /** Reference to the app. */
    app: App;

    /**
     * Handles shared files.
     *
     * @param files - Shared files.
     * @returns A promise that resolves when the shared files are handled.
     */
    handleShareFiles(files: SharedFile[]): Promise<void>;

    /**
     * Handles shared text.
     *
     * @param text - Shared text.
     * @returns A promise that resolves when the shared text is handled.
     */
    handleShareText(text: string): Promise<void>;

    /**
     * Imports shared files.
     *
     * @param files - Shared files.
     * @returns A promise that resolves when the files are imported.
     */
    importFiles(files: SharedFile[]): Promise<void>;

    /**
     * Configures mobile native events to handle file and text sharing.
     */
    setupNative(): void;

    /**
     * Configures the workspace to handle file and text sharing.
     */
    setupWorkspace(): void;
}
