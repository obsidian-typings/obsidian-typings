export {};

declare module 'obsidian' {
    /**
     * A task manager.
     * @since 0.10.2
     */
    interface Tasks {
        /**
         * Add a task.
         *
         * @param callback - The callback to add the task.
         * @official
         * @since 0.10.2
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
        add(callback: () => Promise<any>): void;

        /**
         * Add a promise.
         *
         * @param promise - The promise to add.
         * @official
         * @since 0.10.2
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
        addPromise(promise: Promise<any>): void;

        /**
         * Check if the tasks are empty.
         *
         * @returns Whether the tasks are empty.
         * @official
         * @since 0.10.2
         */
        isEmpty(): boolean;

        /**
         * Get the promise.
         *
         * @returns The promise.
         * @official
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
        promise(): Promise<any>;
    }
}
