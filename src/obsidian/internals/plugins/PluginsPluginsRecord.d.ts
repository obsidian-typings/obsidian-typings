import type { Plugin } from 'obsidian';

/**
 * Record mapping plugin IDs to their active plugin instances.
 * @public
 * @unofficial
 */
export interface PluginsPluginsRecord extends Record<string, Plugin> {}
