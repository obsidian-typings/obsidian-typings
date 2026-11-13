import type { Modal } from 'obsidian';

import type { PublishPluginInstance } from './PublishPluginInstance.d.ts';
import type { PublishReviewChangesSection } from './PublishReviewChangesSection.d.ts';

/**
 * The Publish changes dialog.
 *
 * @public
 * @unofficial
 */
export interface PublishModal extends Modal {
  /** The Publish plugin instance. */
  plugin: PublishPluginInstance;

  /** The review step, listing the changes to publish. */
  reviewChangesSection: PublishReviewChangesSection;

  /**
   * Open the review step.
   *
   * @returns A promise that resolves when the step is shown.
   */
  openReviewChanges(): Promise<void>;
}
