export {};

declare module 'obsidian' {
    /**
     * A stat for a file or folder.
     */
    interface Stat {
        /**
         * Time of creation, represented as a unix timestamp.
         *
         * @official
         */
        ctime: number;

        /**
         * Time of last modification, represented as a unix timestamp.
         *
         * @official
         */
        mtime: number;

        /**
         * Size on disk in bytes.
         *
         * @official
         */
        size: number;

        /**
         * The type of the stat.
         *
         * @official
         */
        type: 'file' | 'folder';
    }
}
