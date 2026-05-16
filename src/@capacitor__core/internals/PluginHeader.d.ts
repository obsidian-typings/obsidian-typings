import type { PluginMethodHeader } from './PluginMethodHeader.d.ts';

/**
 * Plugin header.
 *
 * @public
 * @unofficial
 */
export interface PluginHeader {
  /** Plugin methods. */
  methods: PluginMethodHeader[];
  /** Plugin name. */
  name: string;
}
