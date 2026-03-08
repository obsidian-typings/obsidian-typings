import type { App } from 'obsidian';
import type { Plugins } from '../../Plugins/Plugins.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Plugins constructor.
 *
 * @public
 * @unofficial
 */
export interface PluginsConstructor extends ConstructorBase<[app: App], Plugins> {}
