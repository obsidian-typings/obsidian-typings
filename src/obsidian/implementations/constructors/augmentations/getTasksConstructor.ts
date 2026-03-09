import {
  Tasks
} from 'obsidian';
import type { ConstructorBase } from '../../../internals/constructors/ConstructorBase.d.ts';

type TasksConstructor = ConstructorBase<[], Tasks>;

/**
 * Get the Tasks constructor.
 *
 * @returns The Tasks constructor.
 * @remark Constructor is `null`. See {@link https://forum.obsidian.md/t/api-bug-tasks-class/98993}.
 *
 * @public
 * @unofficial
 */
export function getTasksConstructor(): TasksConstructor {
  return Tasks as TasksConstructor;
}
