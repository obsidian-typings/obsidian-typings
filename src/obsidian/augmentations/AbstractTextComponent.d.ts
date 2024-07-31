export {};

declare module "obsidian" {
    interface AbstractTextComponent<T extends HTMLInputElement | HTMLTextAreaElement> extends ValueComponent<string> {}
}
