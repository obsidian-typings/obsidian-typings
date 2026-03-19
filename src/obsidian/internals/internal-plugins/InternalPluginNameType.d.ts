import type { InternalPluginName } from '../../implementations/constants/InternalPluginName.d.ts';

/**
 * Union type of all internal plugin name string literals.
 *
 * @public
 * @unofficial
 */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
