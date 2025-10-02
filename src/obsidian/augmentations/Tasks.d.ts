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
        add(callback: () => Promise<any>): void;

        /**
         * Add a promise.
         *
         * @param promise - The promise to add.
         * @official
         * @since 0.10.2
         */
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
        promise(): Promise<any>;
    }
}
