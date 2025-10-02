export {};

declare module 'obsidian' {
    /**
     * Slider option.
     *
     * @since 1.10.0
     */
    interface SliderOption extends BaseOption {
        /**
         * Default value.
         *
         * @official
         * @since 1.10.0
         */
        default?: number;

        /**
         * Is instant.
         *
         * @official
         * @since 1.10.0
         */
        instant?: boolean;

        /**
         * Maximum value.
         *
         * @official
         * @since 1.10.0
         */
        max?: number;

        /**
         * Minimum value.
         *
         * @official
         * @since 1.10.0
         */
        min?: number;

        /**
         * Step.
         *
         * @official
         * @since 1.10.0
         */
        step?: number;

        /**
         * Type.
         *
         * @official
         * @since 1.10.0
         */
        type: 'slider';
    }
}
