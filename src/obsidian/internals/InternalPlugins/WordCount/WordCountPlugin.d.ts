import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { WordCountPluginInstance } from './WordCountPluginInstance.d.ts';

/**
 * Internal plugin registration for the word/character count status bar feature.
 * @public
 * @unofficial
 */
export interface WordCountPlugin extends InternalPlugin<WordCountPluginInstance> {}
