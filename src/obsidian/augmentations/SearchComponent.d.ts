export {};

declare module "obsidian" {
    interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {}
}
