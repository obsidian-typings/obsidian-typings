export { };

declare module "obsidian" {
    interface TAbstractFile {
        /**
         * Whether the file or folder is being deleted
         */
        deleted: boolean;
    }
}
