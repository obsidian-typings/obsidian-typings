export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface FileView {
        /**
         * Whether the view may be run without an attached file
         */
        allowNoFile: boolean;
    }
}
