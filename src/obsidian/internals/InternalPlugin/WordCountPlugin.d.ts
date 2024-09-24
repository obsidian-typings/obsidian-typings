import type { InternalPlugin } from './InternalPlugin.js';
import type { WordCountPluginInstance } from './WordCountPluginInstance.js';

/** @public */
export interface WordCountPlugin extends InternalPlugin<WordCountPluginInstance> {}
