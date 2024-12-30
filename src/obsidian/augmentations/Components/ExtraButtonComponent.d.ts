export {};

declare module 'obsidian' {
    interface ExtraButtonComponent extends BaseComponent {
        /**
         * The function that's called after clicking the button.
         * @remark Using `ExtraButtonComponent.onClick(callback)` assigns the callback to this method
         */
        changeCallback?: () => void;
    }
}
