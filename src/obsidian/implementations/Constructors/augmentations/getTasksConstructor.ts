import {
    Tasks
} from 'obsidian';
import type { TasksConstructor } from '../../../internals/Constructors/augmentations/TasksConstructor.ts';

/**
 * Get the Tasks constructor.
 *
 * @returns The Tasks constructor.
 *
 * @public
 * @unofficial
 */
export function getTasksConstructor(): TasksConstructor {
    return Tasks as unknown as TasksConstructor;
}
