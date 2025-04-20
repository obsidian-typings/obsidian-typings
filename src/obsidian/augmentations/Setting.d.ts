export {};

declare module 'obsidian' {
    interface Setting {
        /**
         * Hide the info section of the setting.
         *
         * @unofficial
         */
        setNoInfo(): this;
        /**
         * Shows/hides the setting.
         *
         * @param visible Whether the setting should be visible.
         *
         * @unofficial
         */
        setVisibility(visible: boolean): this;
    }
}
