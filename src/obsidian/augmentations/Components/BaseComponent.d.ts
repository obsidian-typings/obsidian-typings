export {};

declare module 'obsidian' {
    /**
     * The base class for all components.
     */
    interface BaseComponent {
        /**
         * Whether the component is disabled.
         *
         * @official
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
         */
        then(cb: (component: this) => any): this;
    }
}
