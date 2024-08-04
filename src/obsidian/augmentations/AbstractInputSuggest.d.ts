export {};

declare module "obsidian" {
    interface AbstractInputSuggest<T> extends PopoverSuggest<T> {}
}
