import type { getTasksConstructor } from '../implementations/constructors/augmentations/getTasksConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A task manager.
   *
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
    add(callback: () => Promise<unknown>): void;

    /**
     * Add a promise.
     *
     * @param promise - The promise to add.
     * @official
     * @since 0.10.2
     */
    addPromise(promise: Promise<unknown>): void;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getTasksConstructor} from `obsidian-typings/implementations`.
     *
     * @returns The new instance.
     * @remark Constructor is `null`. See {@link https://forum.obsidian.md/t/api-bug-tasks-class/98993}.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(): this;

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
    promise(): Promise<unknown>;
  }
}
