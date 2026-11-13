import type { App } from 'obsidian';

import type { PublishFileDiff } from './PublishFileDiff.d.ts';
import type { PublishFileListSection } from './PublishFileListSection.d.ts';
import type { PublishModal } from './PublishModal.d.ts';

/**
 * The review step of the Publish changes dialog, listing the changes to publish.
 *
 * @public
 * @unofficial
 */
export interface PublishReviewChangesSection {
  /** Reference to the app. */
  app: App;

  /** The section's root element. */
  el: HTMLElement;

  /** The dialog the section belongs to. */
  parentModal: PublishModal;

  /** Every listed change, keyed by vault path. */
  pathToDiffMap: Record<string, PublishFileDiff>;

  /** The list of changed and deleted files. */
  sectionChanged: PublishFileListSection;

  /** The list of new files. */
  sectionNew: PublishFileListSection;

  /** The list of files already published unchanged. */
  sectionUnchanged: PublishFileListSection;

  /** Hide the section. */
  hide(): void;

  /**
   * Scan for changes, refill the file lists and show the section.
   *
   * @returns A promise that resolves when the lists are filled.
   */
  show(): Promise<void>;
}
