export {};

declare module 'obsidian' {
    /**
     * File stats
     */
    interface FileStats {
        /**
         * Time of creation, represented as a unix timestamp, in milliseconds.
         *
         * @official
         */
        ctime: number;

        /**
         * Time of last modification, represented as a unix timestamp, in milliseconds.
         *
         * @official
         */
        mtime: number;

        /**
         * Size on disk, as bytes.
         *
         * @official
         */
        size: number;
    }
}
