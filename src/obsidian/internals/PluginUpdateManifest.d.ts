import type { PluginManifest } from 'obsidian';

/**
 * Information about an available plugin update.
 * @public
 * @unofficial
 */
export interface PluginUpdateManifest {
  /**
   * Manifest of the plugin.
   */
  manifest: PluginManifest;

  /**
   * Repository of the plugin.
   */
  repo: string;

  /**
   * New version of the plugin.
   */
  version: string;
}
