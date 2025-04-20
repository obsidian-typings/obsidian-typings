import type { App } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugins/InternalPlugin.d.ts';
import type { InternalPlugins } from '../InternalPlugins/InternalPlugins.d.ts';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The InternalPlugin constructor.
 *
 * @public
 * @unofficial
 */
export interface InternalPluginConstructor<Instance> extends
    ConstructorBase<[
        app: App,
        instance: Instance,
        internalPlugins: InternalPlugins
    ], InternalPlugin<Instance>>
{}
