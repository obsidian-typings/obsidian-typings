import type { App } from 'obsidian';
import type { InternalPlugins } from '../InternalPlugins/InternalPlugins.d.ts';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The InternalPlugins constructor.
 *
 * @public
 * @unofficial
 */
export interface InternalPluginsConstructor extends ConstructorBase<[app: App], InternalPlugins> {}
