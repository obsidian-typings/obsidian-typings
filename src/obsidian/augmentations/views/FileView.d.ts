export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface FileView extends ItemView {
        /**
         * Whether the view may be run without an attached file
         */
        allowNoFile: boolean;

        /** @internal */
        getSyncViewState(): unknown;
        /** @internal */
        loadFile(e: unknown): unknown;
        /** @internal */
        onDelete(e: unknown): unknown;
        /** @internal */
        onDelete(e: unknown): unknown;
        /** @internal */
        renderBreadcrumbs(): void;
        /** @internal */
        syncState(e: unknown): unknown;
    }
}
