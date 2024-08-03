export {};

declare module "obsidian" {
    interface TextFileView extends EditableFileView {
        /**
         * Whether current file is dirty (different from saved contents)
         */
        dirty: boolean;
        /**
         * Whether editor should be rendered as plaintext
         */
        isPlaintext: boolean;
        /**
         * The data that was last saved
         */
        lastSavedData: null | string;
        /**
         * Whether on saving, the file should be saved again (for dirtiness checks)
         */
        saveAgain: boolean;
        /**
         * Whether the file is currently saving
         */
        saving: boolean;

        /** @internal */
        loadFileInternal(e: unknown, t: unknown): Promise<unknown>;
        /** @internal */
        onModify(e: unknown): void;
        /** @internal */
        saveImmediately(): void;
        /** @internal */
        setData(e: unknown, t: unknown): void;
		/** @internal */
		save(clear?: boolean): Promise<void>;
    }
}
