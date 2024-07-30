import type {
    LinkUpdate,
    LinkUpdaters,
    PositionedReference
} from "../types.js";

export {};

declare module "obsidian" {
    interface FileManager {
        /**
         * Reference to App
         */
        app: App;
        /** @internal */
        fileParentCreatorByType: Map<string, (path: string) => TFolder>;
        /** @internal */
        inProgressUpdates: null | unknown[];
        /** @internal */
        linkUpdaters: LinkUpdaters;
        /** @internal */
        updateQueue: {
            promise: Promise<void>;
        };
        /**
         * Reference to Vault
         */
        vault: Vault;

        /**
         * Creates a new Markdown file in specified location and opens it in a new view
         *
         * @param path - Path to the file to create (missing folders will be created)
         * @param location - Where to open the view containing the new file
         */
        createAndOpenMarkdownFile(path: string, location: PaneType): Promise<void>;
        /**
         * Create a new file in the vault at specified location
         *
         * @param location - Location to create the file in, defaults to root
         * @param filename - Name of the file to create, defaults to "Untitled" (incremented if file already
         *   exists)
         * @param extension - Extension of the file to create, defaults to "md"
         * @param contents - Contents of the file to create, defaults to empty string
         */
        createNewFile(location: TFolder, filename: string, extension: string, contents: string): Promise<TFile>;
        /**
         * Creates a new untitled folder in the vault at specified location
         *
         * @param location - Location to create the folder in, defaults to root
         */
        createNewFolder(location: TFolder): Promise<TFolder>;
        /**
         * Creates a new Markdown file in the vault at specified location
         */
        createNewMarkdownFile(location: TFolder, filename: string, contents: string): Promise<TFile>;
        /**
         * Creates a new Markdown file based on linktext and path
         *
         * @param filename - Name of the file to create
         * @param path - Path to where the file should be created
         */
        createNewMarkdownFileFromLinktext(filename: string, path: string): Promise<TFile>;
        /** @internal */
        getAllLinkResolutions(): [];
        /**
         * Gets the folder that new markdown files should be saved to, based on the current settings
         *
         * @param path - The path of the current opened/focused file, used when the user wants new files to be
         *   created in the same folder as the current file
         */
        getMarkdownNewFileParent(path: string): TFolder;
        /**
         * Insert text into a file
         *
         * @param file - File to insert text into
         * @param primary_text - Text to insert (will not be inserted if secondary_text exists)
         * @param basename - ???
         * @param secondary_text - Text to insert (always inserted)
         * @param atStart - Whether to insert text at the start or end of the file
         */
        insertTextIntoFile(
            file: TFile,
            primary_text: string,
            basename: string,
            secondary_text: string,
            atStart: boolean
        ): Promise<void>;
        /**
         * Iterate over all links in the vault with callback
         *
         * @param callback - Callback to execute for each link
         */
        iterateAllRefs(callback: (path: string, link: PositionedReference) => void): void;
        /**
         * Merge two files
         *
         * @param file - File to merge to
         * @param otherFile - File to merge from
         * @param override - If not empty, will override the contents of the file with this string
         * @param atStart - Whether to insert text at the start or end of the file
         */
        mergeFile(file: TFile, otherFile: TFile, override: string, atStart: boolean): Promise<void>;
        /**
         * Prompt the user to delete a file
         */
        promptForDeletion(file: TFile): Promise<void>;
        /**
         * Prompt the user to rename a file
         */
        promptForFileRename(file: TFile): Promise<void>;
        /**
         * @internal
         * Register an extension to be the parent for a specific file type
         */
        registerFileParentCreator(extension: string, location: TFolder): void;
        /**
         * @param callback - Callback to execute for each link
         * @internal
         */
        runAsyncLinkUpdate(callback: (link: LinkUpdate) => unknown): void;
        /**
         * @param path
         * @param data
         * @internal
         */
        storeTextFileBackup(path: string, data: string): void;
        /**
         * Remove a file and put it in the trash (no confirmation modal)
         */
        trashFile(file: TFile): Promise<void>;
        /** @internal : Unregister extension as root input directory for file type */
        unregisterFileCreator(extension: string): void;
        /** @internal */
        updateAllLinks(links: unknown[]): Promise<void>;
        /** @internal */
        updateInternalLinks(data: unknown): unknown;
    }
}
