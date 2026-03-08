import type { InternalPlugin } from '../../../internal-plugins/InternalPlugin.d.ts';
import type { ExtractConstructor } from '../../ExtractConstructor.d.ts';

/**
 * The InternalPlugin constructor.
 *
 * @typeParam Instance - The type of the plugin instance.
 * @public
 * @unofficial
 */
export type InternalPluginConstructor<Instance> = ExtractConstructor<InternalPlugin<Instance>>;
