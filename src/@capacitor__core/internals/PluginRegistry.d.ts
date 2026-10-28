import type { CapacitorFilesystemPlugin } from '../../obsidian/internals/CapacitorFilesystemPlugin/CapacitorFilesystemPlugin.d.ts';

/**
 * Plugin registry.
 *
 * @public
 * @unofficial
 */
export interface PluginRegistry extends Record<string, unknown> {
  /** Obsidian's native file system plugin. Registered only on a native mobile platform. */
  Filesystem?: CapacitorFilesystemPlugin;
}
