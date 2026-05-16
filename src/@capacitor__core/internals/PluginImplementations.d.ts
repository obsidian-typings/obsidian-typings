/**
 * Plugin implementations map.
 *
 * @public
 * @unofficial
 */
export interface PluginImplementations {
  /** Plugin implementation for the given platform. */
  [platform: string]: (() => Promise<{ new (): unknown }>) | { new (): unknown };
}
