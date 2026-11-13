import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PublishModal } from './PublishModal.d.ts';
import type { PublishPlugin } from './PublishPlugin.d.ts';

/**
 * Plugin instance for Obsidian Publish, managing cloud publishing of vault content.
 *
 * @public
 * @unofficial
 */
export interface PublishPluginInstance extends InternalPluginInstance<PublishPlugin> {
  /**
   * Reference to the app.
   */
  app: App;

  /** The Publish changes dialog, `null` until it is first opened. */
  modal: null | PublishModal;

  /**
   * Reference to the publish plugin registration.
   */
  plugin: PublishPlugin;

  /** The id of the site the vault publishes to, `null` when none is set up. */
  siteId: null | string;

  /**
   * Get the slug of the current site.
   *
   * @returns The site's slug, or its id when the lookup fails.
   */
  getCurrentSlug(): Promise<string>;

  /**
   * Open the Publish changes dialog, creating it on first use.
   *
   * @param getSection - Picks the dialog step to open instead of the review step.
   */
  openModal(getSection?: (modal: PublishModal) => unknown): void;
}
