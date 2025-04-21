export {};

declare module 'obsidian' {
    /**
     * Custom options for writing to a file.
     */
    interface DataWriteOptions {
        /**
         * Time of creation, represented as a unix timestamp, in milliseconds.
         * Omit this if you want to keep the default behavior.
         *
         * @official
         */
        ctime?: number;

        /**
         * Time of last modification, represented as a unix timestamp, in milliseconds.
         * Omit this if you want to keep the default behavior.
         *
         * @official
         */
        mtime?: number;
    }
}
