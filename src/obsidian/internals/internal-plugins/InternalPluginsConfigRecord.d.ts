import type { InternalPluginNameType } from './InternalPluginNameType.d.ts';

/**
 * Record mapping internal plugin names to their enabled/disabled state.
 *
 * @public
 * @unofficial
 */
export interface InternalPluginsConfigRecord extends Record<InternalPluginNameType, boolean> {}
