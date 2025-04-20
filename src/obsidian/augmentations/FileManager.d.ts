import type { LinkChangeUpdate } from '../internals/LinkUpdate/LinkChangeUpdate.d.ts';
import type { LinkUpdate } from '../internals/LinkUpdate/LinkUpdate.d.ts';
import type { LinkUpdateHandler } from '../internals/LinkUpdate/LinkUpdateHandler.d.ts';
import type { LinkUpdaters } from '../internals/LinkUpdate/LinkUpdaters.d.ts';
import type { PositionedReference } from '../internals/PositionedReference.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';

export {};

declare module 'obsidian' {
    interface FileManager {
        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;
        /**
         * @unofficial
         */
        fileParentCreatorByType: Record<string, (path: string) => TFolder>;
        /**
         * @unofficial
         */
        inProgressUpdates: null | LinkUpdateHandler[];
        /**
         * @unofficial
         */
        linkUpdaters: LinkUpdaters;
        /**
         * @unofficial
         */
        updateQueue: PromisedQueue;
        /**
         * Reference to Vault.
         *
         * @unofficial
         */
        vault: Vault;

        /**
         * @unofficial
         */
        canCreateFileWithExt(extension: string): boolean;
        /**
         * Creates a new Markdown file in specified location and opens it in a new view.
         *
         * @param path - Path to the file to create (missing folders will be created).
         * @param location - Where to open the view containing the new file.
         *
         * @unofficial
         */
        createAndOpenMarkdownFile(path: string, location: PaneType): Promise<void>;
        /**
         * Create a new file in the vault at specified location.
         *
         * @param location - Location to create the file in, defaults to root.
         * @param filename - Name of the file to create, defaults to 'Untitled' (incremented if file already exists).
         * @param extension - Extension of the file to create, defaults to 'md'.
         * @param contents - Contents of the file to create, defaults to empty string.
         *
         * @unofficial
         */
        createNewFile(location?: TFolder, filename?: string, extension?: string, contents?: string): Promise<TFile>;
        /**
         * Creates a new untitled folder in the vault at specified location.
         *
         * @param location - Location to create the folder in, defaults to root.
         *
         * @unofficial
         */
        createNewFolder(location: TFolder): Promise<TFolder>;
        /**
         * Creates a new Markdown file in the vault at specified location.
         *
         * @unofficial
         */
        createNewMarkdownFile(location: TFolder, filename: string, contents: string): Promise<TFile>;
        /**
         * Creates a new Markdown file based on linktext and path.
         *
         * @param filename - Name of the file to create.
         * @param path - Path to where the file should be created.
         *
         * @unofficial
         */
        createNewMarkdownFileFromLinktext(filename: string, path: string): Promise<TFile>;
        /**
         * Download attachments for note.
         *
         * @unofficial
         */
        downloadAttachmentsForNote(file: TFile): Promise<void>;
        /**
         * Always returns an empty array.
         *
         * @unofficial
         */
        getAllLinkResolutions(): [];
        /**
         * Gets the folder that new markdown files should be saved to, based on the current settings.
         *
         * @param path - The path of the current opened/focused file, used when the user wants new files to be created in the same folder as the current file.
         *
         * @unofficial
         */
        getMarkdownNewFileParent(path: string): TFolder;
        /**
         * Insert text into a file.
         *
         * @unofficial
         */
        insertIntoFile(file: TFile, text: string, position?: 'append' | 'prepend'): Promise<void>;
        /**
         * Iterate over all links in the vault with callback.
         *
         * @param callback - Callback to execute for each link.
         *
         * @unofficial
         */
        iterateAllRefs(callback: (path: string, link: PositionedReference) => void): void;
        /**
         * Merge two files.
         *
         * @param file - File to merge to.
         * @param otherFile - File to merge from.
         * @param override - If not empty, will override the contents of the file with this string.
         * @param atStart - Whether to insert text at the start or end of the file.
         *
         * @unofficial
         */
        mergeFile(file: TFile, otherFile: TFile, override: string, atStart: boolean): Promise<void>;
        /**
         * Prompt the user to delete a file.
         *
         * @unofficial
         */
        promptForDeletion(file: TAbstractFile): Promise<void>;
        /**
         * Prompt the user to delete a file.
         *
         * @unofficial
         */
        promptForFileDeletion(file: TFile): Promise<void>;
        /**
         * Prompt the user to rename a file.
         *
         * @unofficial
         */
        promptForFileRename(file: TFile): Promise<void>;
        /**
         * Prompt the user to delete a folder.
         *
         * @unofficial
         */
        promptForFolderDeletion(folder: TFolder): Promise<void>;
        /**
         * Prompt the user to download an image.
         *
         * @unofficial
         */
        promptForImageDownload(urls: string[]): Promise<undefined | null | Record<string, TFile>>;
        /**
         * Register an extension to be the parent for a specific file type.
         *
         * @unofficial
         */
        registerFileParentCreator(extension: string, location: TFolder): void;
        /**
         * Rename's a property for all notes currently that have the old key.
         *
         * @remark The current property type is maintained.
         * @remark Is case sensitive, despite Obsidian *typically* ignoring case for property names.
         *
         * @unofficial
         */
        renameProperty(oldKey: string, newKey: string): Promise<void>;
        /**
         * Run async link update.
         *
         * @unofficial
         */
        runAsyncLinkUpdate(linkUpdateHandler: LinkUpdateHandler): Promise<void>;
        /**
         * Store text file backup.
         *
         * @unofficial
         */
        storeTextFileBackup(path: string, data: string): void;
        /**
         * Unregister extension as root input directory for file type.
         *
         * @unofficial
         */
        unregisterFileCreator(extension: string): void;
        /**
         * Update all links.
         *
         * @unofficial
         */
        updateAllLinks(links: LinkUpdate[]): Promise<void>;
        /**
         * Update internal links.
         *
         * @unofficial
         */
        updateInternalLinks(data: Map<string, LinkChangeUpdate>): Promise<void>;
    }
}
