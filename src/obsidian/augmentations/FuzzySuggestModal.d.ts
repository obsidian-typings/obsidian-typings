export {};

declare module "obsidian" {
    interface FuzzySuggestModal<T> extends SuggestModal<FuzzyMatch<T>> {}
}
