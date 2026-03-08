import type { Plugins } from '../../plugins/Plugins.d.ts';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The Plugins constructor.
 *
 * @public
 * @unofficial
 */
export type PluginsConstructor = ExtractConstructor<Plugins>;
