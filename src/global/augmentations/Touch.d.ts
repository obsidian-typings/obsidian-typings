export {};

declare global {
    /**
     * Augments the built-in {@link Touch} interface.
     */
    interface Touch {
        /**
         * The type of touch.
         * @official
         */
        touchType: 'stylus' | 'direct';
    }
}
