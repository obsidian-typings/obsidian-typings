export {};

declare module 'obsidian' {
    /**
     * File view
     */
    interface FileView extends ItemView {
        /**
         * Whether the view may be run without an attached file..
         *
         * @official
         */
        allowNoFile: boolean;

        /**
         * The file that is currently being viewed.
         *
         * @official
         */
        file: TFile | null;

        /**
         * Whether the file view can be navigated (`true` by default).
         *
         * @inheritDoc
         * @official
         */
        navigation: boolean;

        /**
         * Whether the file view can accept an extension.
         *
         * @param extension - The extension to check.
         * @returns Whether the file view can accept the extension.
         * @example
         * ```ts
         * console.log(fileView.canAcceptExtension('md'));
         * ```
         * @official
         */
        canAcceptExtension(extension: string): boolean;

        /**
         * Create a new file view.
         *
         * @param leaf - The workspace leaf to create the file view in.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * Get the display text for the file view.
         *
         * @returns The display text for the file view.
         * @official
         */
        getDisplayText(): string;

        /**
         * Get the state of the file view.
         *
         * @returns The state of the file view.
         * @official
         */
        getState(): Record<string, unknown>;

        /**
         * Get view state for sync plugin.
         *
         * @unofficial
         */
        getSyncViewState(): unknown;

        /**
         * Loads the file with the onLoadFile function.
         *
         * @param file The File to load.
         * @unofficial
         */
        loadFile(file: TFile): Promise<unknown>;

        /**
         * Updates the view if it contains the deleted file.
         *
         * @param file The file that is deleted.
         * @unofficial
         */
        onDelete(file: TFile): Promise<void>;

        /**
         * Called when the file view is loaded.
         *
         * @official
         */
        onload(): void;

        /**
         * Called when the file is loaded.
         *
         * @param file - The file that is being loaded.
         * @returns A promise that resolves when the file is loaded.
         * @example
         * ```ts
         * class MyFileView extends FileView {
         *     public override async onLoadFile(file: TFile): Promise<void> {
         *         await super.onLoadFile(file);
         *         console.log(file);
         *     }
         * }
         * ```
         * @official
         */
        onLoadFile(file: TFile): Promise<void>;

        /**
         * Called when the file is renamed.
         *
         * @param file - The file that is being renamed.
         * @returns A promise that resolves when the file is renamed.
         * @example
         * ```ts
         * class MyFileView extends FileView {
         *     public override async onRename(file: TFile): Promise<void> {
         *         await super.onRename(file);
         *         console.log(file);
         *     }
         * }
         * @official
         */
        onRename(file: TFile): Promise<void>;

        /**
         * Called when the file is unloaded.
         *
         * @param file - The file that is being unloaded.
         * @returns A promise that resolves when the file is unloaded.
         * @example
         * ```ts
         * class MyFileView extends FileView {
         *     public override async onUnloadFile(file: TFile): Promise<void> {
         *         await super.onUnloadFile(file);
         *         console.log(file);
         *     }
         * }
         * @official
         */
        onUnloadFile(file: TFile): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        renderBreadcrumbs(): void;

        /**
         * Set the state of the file view.
         *
         * @param state - The state to set.
         * @param result - The result of the state.
         * @returns A promise that resolves when the state is set.
         * @example
         * ```ts
         * await fileView.setState({ foo: 'bar' }, { history: true });
         * ```
         * @official
         */
        setState(state: any, result: ViewStateResult): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        syncState(e: boolean): Promise<unknown>;
    }
}
