import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { FileRecoveryPluginInstance } from './FileRecoveryPluginInstance.d.ts';

/**
 * Internal plugin registration for the file recovery/snapshots feature.
 *
 * @public
 * @unofficial
 */
export interface FileRecoveryPlugin extends InternalPlugin<FileRecoveryPluginInstance> {}
