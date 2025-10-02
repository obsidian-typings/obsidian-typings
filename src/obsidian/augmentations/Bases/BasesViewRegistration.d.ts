export {};

declare module 'obsidian' {
    /**
     * Container for options when registering a new Bases view type.
     *
     * @since 1.10.0
     */
    interface BasesViewRegistration {
        /**
         * Factory.
         *
         * @official
         * @since 1.10.0
         */
        factory: BasesViewFactory;

        /**
         * Icon ID to be used in the Bases view selector.
         * See {@link https://docs.obsidian.md/Plugins/User+interface/Icons} for available icons and how to add your own.
         * @official
         * @since 1.10.0
         */
        icon: IconName;

        /**
         * Name.
         *
         * @official
         * @since 1.10.0
         */
        name: string;

        /**
         * Options.
         *
         * @official
         * @since 1.10.0
         */
        options?: () => ViewOption[];
    }
}
