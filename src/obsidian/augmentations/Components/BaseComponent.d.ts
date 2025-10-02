export {};

declare module 'obsidian' {
    /**
     * The base class for all components.
     * @since 0.10.3
     */
    interface BaseComponent {
        /**
         * Whether the component is disabled.
         *
         * @official
         * @since 0.10.3
         */
        disabled: boolean;

        /**
         * Sets the disabled state of the component.
         *
         * @param disabled - Whether to disable the component.
         * @returns The component instance.
         * @example
         * ```ts
         * component.setDisabled(true);
         * ```
         * @official
         * @since 1.2.3
         */
        setDisabled(disabled: boolean): this;

        /**
         * Facilitates chaining.
         *
         * @param cb - The callback to execute.
         * @returns The component instance.
         * @example
         * ```ts
         * component.then((x) => {
         *     console.log(x);
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        then(cb: (component: this) => any): this;
    }
}
