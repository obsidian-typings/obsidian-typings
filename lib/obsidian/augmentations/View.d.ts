export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface View {
        /**
         * Whether the leaf may close the view
         */
        closeable: boolean;
    }
}
