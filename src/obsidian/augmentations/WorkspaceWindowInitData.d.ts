export {};

declare module 'obsidian' {
    interface WorkspaceWindowInitData {
        /**
         * The suggested size.
         *
         * @official
         */
        size?: {
            /**
             * The width.
             * @official
             */
            width: number;
            /**
             * The height.
             *
             * @official
             */
            height: number;
        };

        /**
         * The x position.
         *
         * @official
         */
        x?: number;

        /**
         * The y position.
         *
         * @official
         */
        y?: number;
    }
}
