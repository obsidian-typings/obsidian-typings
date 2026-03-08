import type { App } from 'obsidian';
import type { Cli } from '../../cli/Cli.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Cli constructor.
 *
 * @public
 * @unofficial
 */
export interface CliConstructor extends ConstructorBase<[app: App], Cli> {}
