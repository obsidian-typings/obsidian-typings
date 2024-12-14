import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { FileRecoveryPlugin } from './FileRecoveryPlugin.js';

/** @public */
export interface FileRecoveryPluginInstance extends InternalPluginInstance<FileRecoveryPlugin> {
    app: App;
    defaultOn: true;
}
