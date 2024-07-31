export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface FileView extends ItemView {
        /**
         * Whether the view may be run without an attached file
         */
        allowNoFile: boolean;
    }
}
