export {};

declare module 'obsidian' {
    interface ProgressBarComponent extends ValueComponent<number> {}
}
