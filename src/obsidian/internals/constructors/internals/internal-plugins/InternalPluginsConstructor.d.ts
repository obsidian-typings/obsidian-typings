import type { InternalPlugins } from '../../../internal-plugins/InternalPlugins.d.ts';
import type { ExtractConstructor } from '../../ExtractConstructor.d.ts';

/**
 * The InternalPlugins constructor.
 *
 * @public
 * @unofficial
 */
export type InternalPluginsConstructor = ExtractConstructor<InternalPlugins>;
