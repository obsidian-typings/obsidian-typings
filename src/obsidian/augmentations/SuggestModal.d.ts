export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface SuggestModal<T> extends Modal, ISuggestOwner<T> {
        /** @internal */
        clearButtonEl: HTMLButtonElement;
    }
}
