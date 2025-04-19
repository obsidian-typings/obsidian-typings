import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FileRecoveryPlugin } from './FileRecoveryPlugin.d.ts';

/** @public @unofficial */
export interface FileRecoveryPluginInstance extends InternalPluginInstance<FileRecoveryPlugin> {
    app: App;
    defaultOn: true;
}
