import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { FootnotesPlugin } from './FootnotesPlugin.d.ts';

/**
 * Plugin instance for footnotes, providing footnote creation and navigation.
 *
 * @public
 * @unofficial
 */
export interface FootnotesPluginInstance extends InternalPluginInstance<FootnotesPlugin> {
  /** Initialize the footnotes view leaf. */
  initLeaf(): void;
}
