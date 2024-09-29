import type { App } from 'obsidian';
import type { FileRecoveryPlugin } from './FileRecoveryPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface FileRecoveryPluginInstance extends InternalPluginInstance<FileRecoveryPlugin> {
    app: App;
    defaultOn: boolean;
}
