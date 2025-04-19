export {};

declare module 'obsidian' {
    interface ButtonComponent extends BaseComponent {
        /**
         * The function that's called after clicking the button.
         * @remark Using `ButtonComponent.onClick(callback)` assigns the callback to this method.
         */
        clickCallback?(): void;
    }
}
