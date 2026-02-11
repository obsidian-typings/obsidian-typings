export {};

declare module 'obsidian' {
    /**
     * Component for a secret input.
     *
     * @since 1.11.1
     */
    interface SecretComponent extends BaseComponent {
        /**
         * Creates a new secret component.
         *
         * @param app - the application instance.
         * @param containerEl - the container element.
         * @returns the secret component instance.
         * @official
         * @since 1.11.1
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App, containerEl: HTMLElement): this;

        /**
         * Sets the callback function to be called when the value of the secret component changes.
         *
         * @param cb - the callback function.
         * @returns the secret component instance.
         * @public
         * @since 1.11.4
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        onChange(cb: (value: string) => unknown): this;

        /**
         * Sets the value of the secret component.
         *
         * @param value - the value to set.
         * @returns the secret component instance.
         * @public
         * @since 1.11.4
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        setValue(value: string): this;
    }
}
