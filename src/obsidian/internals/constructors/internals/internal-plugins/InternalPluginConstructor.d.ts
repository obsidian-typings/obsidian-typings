import type { App } from 'obsidian';
import type { InternalPlugin } from '../../../internal-plugins/InternalPlugin.d.ts';
import type { InternalPlugins } from '../../../internal-plugins/InternalPlugins.d.ts';
import type { ConstructorBase } from '../../ConstructorBase.d.ts';

/**
 * The InternalPlugin constructor.
 *
 * @typeParam Instance - The type of the plugin instance.
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
