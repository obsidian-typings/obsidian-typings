import type { App } from 'obsidian';
import type { SharedFile } from './SharedFile.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface ShareReceiver {
    /** @todo Documentation incomplete. */
    app: App;

    /**
     * Handles shared files.
     *
     * @param files - Shared files.
     */
    handleShareFiles(files: SharedFile[]): Promise<void>;

    /**
     * Handles shared text.
     *
     * @param text - Shared text.
     */
    handleShareText(text: string): Promise<void>;

    /**
     * Imports shared files.
     *
     * @param files - Shared files.
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
