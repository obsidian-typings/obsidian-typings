export {};

declare module 'obsidian' {
    /**
     * A task manager.
     */
    interface Tasks {
        /**
         * Add a task.
         *
         * @param callback - The callback to add the task.
         * @official
         */
        add(callback: () => Promise<any>): void;

        /**
         * Add a promise.
         *
         * @param promise - The promise to add.
         * @official
         */
        addPromise(promise: Promise<any>): void;

        /**
         * Check if the tasks are empty.
         *
         * @returns Whether the tasks are empty.
         * @official
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
