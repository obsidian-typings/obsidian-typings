import type { LinkChangeUpdate } from '../internals/LinkUpdate/LinkChangeUpdate.d.ts';
import type { LinkUpdate } from '../internals/LinkUpdate/LinkUpdate.d.ts';
import type { LinkUpdaters } from '../internals/LinkUpdate/LinkUpdaters.d.ts';
import type { LinkUpdatesHandler } from '../internals/LinkUpdate/LinkUpdatesHandler.d.ts';
import type { PositionedReference } from '../internals/PositionedReference.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Manage the creation, deletion and renaming of files from the UI.
     */
    interface FileManager {
        /**
         * Reference to App.
         *
         * @unofficial
         */
        app: App;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        fileParentCreatorByType: Record<string, (path: string) => TFolder>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        inProgressUpdates: null | LinkUpdatesHandler[];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        linkUpdaters: LinkUpdaters;

        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        canCreateFileWithExt(extension: string): boolean;

        /**
         * Creates a new Markdown file in specified location and opens it in a new view.
         *
         * @param path - Path to the file to create (missing folders will be created).
         * @param location - Where to open the view containing the new file.
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
         * @unofficial
         */
        createNewFile(location?: TFolder, filename?: string, extension?: string, contents?: string): Promise<TFile>;

        /**
         * Creates a new untitled folder in the vault at specified location.
         *
         * @param location - Location to create the folder in, defaults to root.
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
         * Generate a Markdown link based on the user's preferences.
         *
         * @param file - the file to link to.
         * @param sourcePath - where the link is stored in, used to compute relative links.
         * @param subpath - A subpath, starting with `#`, used for linking to headings or blocks.
         * @param alias - The display text if it's to be different than the file name. Pass empty string to use file name.
         * @returns A markdown link.
         * @example
         * ```ts
         * const file = app.vault.getFileByPath('foo/bar.md');
         * console.log(app.fileManager.generateMarkdownLink(file, 'baz/qux.md', '#heading', 'Display text')); // [[bar#heading|Display text]]
         * ```
         * @official
         */
        generateMarkdownLink(file: TFile, sourcePath: string, subpath?: string, alias?: string): string;

        /**
         * Always returns an empty array.
         *
         * @unofficial
         */
        getAllLinkResolutions(): [];

        /**
         * Resolves a unique path for the attachment file being saved.
         * Ensures that the parent directory exists and dedupes the
         * filename if the destination filename already exists.
         *
         * @param filename Name of the attachment being saved.
         * @param sourcePath The path to the note associated with this attachment, defaults to the workspace's active file.
         * @returns A promise that resolves to the full path for where the attachment should be saved, according to the user's settings.
         * @example
         * ```ts
         * console.log(await app.fileManager.getAvailablePathForAttachment('image.png'));
         * ```
         * @official
         */
        getAvailablePathForAttachment(filename: string, sourcePath?: string): Promise<string>;

        /**
         * Gets the folder that new markdown files should be saved to, based on the current settings.
         *
         * @param path - The path of the current opened/focused file, used when the user wants new files to be created in the same folder as the current file.
         * @unofficial
         */
        getMarkdownNewFileParent(path: string): TFolder;

        /**
         * Gets the folder that new files should be saved to, given the user's preferences.
         *
         * @param sourcePath - The path to the current open/focused file,
         * used when the user wants new files to be created 'in the same folder'.
         * Use an empty string if there is no active file.
         * @param newFilePath - The path to the file that will be newly created,
         * used to infer what settings to use based on the path's extension.
         * @returns The folder that new files should be saved to.
         * @example
         * ```ts
         * console.log(app.fileManager.getNewFileParent('foo/bar.md', 'baz/qux.md'));
         * ```
         * @official
         */
        getNewFileParent(sourcePath: string, newFilePath?: string): TFolder;

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
         * @unofficial
         */
        mergeFile(file: TFile, otherFile: TFile, override: string, atStart: boolean): Promise<void>;

        /**
         * Atomically read, modify, and save the frontmatter of a note.
         * The frontmatter is passed in as a JS object, and should be mutated directly to achieve the desired result.
         *
         * Remember to handle errors thrown by this method.
         *
         * @param file - the file to be modified. Must be a Markdown file.
         * @param fn - a callback function which mutates the frontmatter object synchronously.
         * @param options - write options.
         * @throws YAMLParseError if the YAML parsing fails.
         * @throws any errors that your callback function throws.
         * @example
         * ```ts
         * await app.fileManager.processFrontMatter(file, (frontmatter) => {
         *     frontmatter['key1'] = value;
         *     delete frontmatter['key2'];
         * });
         * ```
         * @official
         */
        processFrontMatter(file: TFile, fn: (frontmatter: any) => void, options?: DataWriteOptions): Promise<void>;

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
         * Rename or move a file or folder safely, and update all links to it depending on the user's preferences.
         *
         * @param file - the file or folder to rename.
         * @param newPath - the new path for the file or folder.
         * @returns A promise that resolves when the file or folder is renamed.
         * @example
         * ```ts
         * const file = app.vault.getFileByPath('foo/bar.md');
         * await app.fileManager.renameFile(file, 'baz/qux.md');
         * ```
         * @official
         */
        renameFile(file: TAbstractFile, newPath: string): Promise<void>;

        /**
         * Rename's a property for all notes currently that have the old key.
         *
         * @remark The current property type is maintained.
         * @remark Is case sensitive, despite Obsidian *typically* ignoring case for property names.
         * @unofficial
         */
        renameProperty(oldKey: string, newKey: string): Promise<void>;

        /**
         * Run async link update.
         *
         * @unofficial
         */
        runAsyncLinkUpdate(linkUpdatesHandler: LinkUpdatesHandler): Promise<void>;

        /**
         * Store text file backup.
         *
         * @unofficial
         */
        storeTextFileBackup(path: string, data: string): void;

        /**
         * Remove a file or a folder from the vault according the user's preferred 'trash'.
         * options (either moving the file to .trash/ or the OS trash bin).
         *
         * @param file - the file or folder to trash.
         * @returns A promise that resolves when the file or folder is trashed.
         * @example
         * ```ts
         * const file = app.vault.getFileByPath('foo/bar.md');
         * await app.fileManager.trashFile(file);
         * ```
         * @official
         */
        trashFile(file: TAbstractFile): Promise<void>;

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
