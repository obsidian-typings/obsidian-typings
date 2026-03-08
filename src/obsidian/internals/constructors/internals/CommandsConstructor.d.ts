import type { App } from 'obsidian';
import type { Commands } from '../../commands/Commands.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Commands constructor.
 *
 * @public
 * @unofficial
 */
export interface CommandsConstructor extends ConstructorBase<[app: App], Commands> {}
