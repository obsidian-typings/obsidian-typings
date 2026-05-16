import type { PluginImplementations } from './PluginImplementations.d.ts';

/**
 * Plugin registration function.
 *
 * @public
 * @unofficial
 */
export type RegisterPlugin = <T>(pluginName: string, implementations?: Readonly<PluginImplementations>) => T;
