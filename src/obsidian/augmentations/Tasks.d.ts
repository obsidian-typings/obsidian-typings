import type { getTasksConstructor } from '../implementations/constructors/augmentations/getTasksConstructor.d.ts';

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
     * Constructor.
     *
     * To get the constructor instance, use {@link getTasksConstructor} from `obsidian-typings/implementations`.
     *
     * @returns The new instance.
     * @remark Constructor is `null`. See {@link https://forum.obsidian.md/t/api-bug-tasks-class/98993}.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__(): this;

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
