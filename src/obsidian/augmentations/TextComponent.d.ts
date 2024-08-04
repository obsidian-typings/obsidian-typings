export {};

declare module "obsidian" {
    interface TextComponent extends AbstractTextComponent<HTMLInputElement> {}
}
