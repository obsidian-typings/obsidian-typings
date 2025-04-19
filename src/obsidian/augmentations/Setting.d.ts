export {};

declare module 'obsidian' {
    interface Setting {
        /**
         * Hide the info section of the setting.
         */
        setNoInfo(): this;
        /**
         * Shows/hides the setting.
         *
         * @param visible Whether the setting should be visible.
         */
        setVisibility(visible: boolean): this;
    }
}
