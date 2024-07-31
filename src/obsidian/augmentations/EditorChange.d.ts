export {};

declare module "obsidian" {
    interface EditorChange extends EditorRangeOrCaret {}
}
