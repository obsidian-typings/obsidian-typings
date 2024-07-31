export {};

declare module "obsidian" {
    interface TextAreaComponent extends AbstractTextComponent<HTMLTextAreaElement> {}
}
