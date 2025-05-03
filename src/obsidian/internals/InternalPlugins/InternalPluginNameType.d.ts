import type { InternalPluginName } from '../../implementations/Constants/InternalPluginName.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
