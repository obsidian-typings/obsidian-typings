export {};

declare module 'obsidian' {
    /**
     * Notification component. Use to present timely, high-value information.
     * @since 0.9.7
     */
    interface Notice {
        /**
         * The container HTML element for the notice.
         *
         * @official
         * @since 1.8.7
         */
        containerEl: HTMLElement;

        /**
         * The HTML element that represents the message of the notice.
         *
         * @official
         * @since 1.8.7
         */
        messageEl: HTMLElement;

        /**
         * The HTML element that represents the notice.
         *
         * @deprecated Use `messageEl` instead
         * @official
         * @since 0.9.7
         */
        noticeEl: HTMLElement;

        /**
         * Creates a new notice.
         *
         * @param message - The message to be displayed, can either be a simple string or a {@link DocumentFragment}.
         * @param duration - Time in milliseconds to show the notice for. If this is `0`, the
         * `Notice` will stay visible until the user manually dismisses it.
         * @example
         * ```ts
         * new Notice('foo');
         *
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'bar' });
         * new Notice(fragment);
         *
         * new Notice('baz', 1000); // will be visible for 1 second
         * new Notice('qux', 0); // will stay visible until the user manually dismisses it
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(message: string | DocumentFragment, duration?: number): this;

        /**
         * Hide the notice.
         *
         * @official
         * @since 0.9.7
         */
        hide(): void;

        /**
         * Change the message of this notice.
         *
         * @param message - The message to be displayed, can either be a simple string or a {@link DocumentFragment}.
         * @returns The notice instance.
         * @example
         * ```ts
         * notice.setMessage('foo');
         *
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'bar' });
         * notice.setMessage(fragment);
         * ```
         * @official
         * @since 0.9.7
         */
        setMessage(message: string | DocumentFragment): this;
    }
}
