import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { RandomNotePlugin } from './RandomNotePlugin.d.ts';

/**
 * Plugin instance for opening a random note from the vault.
 * @public
 * @unofficial
 */
export interface RandomNotePluginInstance extends InternalPluginInstance<RandomNotePlugin> {
  /** Reference to the app. */
  app: App;
}
