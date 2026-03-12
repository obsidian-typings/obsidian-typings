import type { PluginManifest } from 'obsidian';

/**
 * Record mapping plugin IDs to their manifest metadata.
 *
 * @public
 * @unofficial
 */
export interface PluginsManifestsRecord extends Record<string, PluginManifest> {}
