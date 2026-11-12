import type {
  App,
  Component,
  TAbstractFile,
  TFile
} from 'obsidian';

import type { ItemQueue } from '../../../collections/ItemQueue.d.ts';
import type { ResultDom } from '../../../tree/ResultDom.d.ts';
import type { SearchQueueStartOptions } from './SearchQueueStartOptions.d.ts';

/**
 * Component managing a result pane's file queue, also used outside global Search.
 * Initial batches contain all vault files in result sort order. Later file changes remain live.
 *
 * @public
 * @unofficial
 */
export interface SearchQueueComponent extends Component {
  /** The app instance. */
  app: App;

  /** The result renderer whose loader and deleted results are updated. */
  dom: ResultDom;

  /** The active queue, or `null` before starting and after cancellation. */
  queue: ItemQueue<TFile> | null;

  /**
   * Files the current search read and did not match, which a narrowing search skips.
   * A file leaves the set when it changes or is deleted, and the set is cleared when registered extensions change.
   */
  unmatchedFiles: Set<TFile>;

  /**
   * Queues a changed file. Folder events are ignored.
   *
   * @param file - The changed file or folder.
   */
  onFileChanged(file: TAbstractFile): void;

  /**
   * Removes a deleted file from the queue and results.
   *
   * @param file - The deleted file or folder.
   */
  onFileDeleted(file: TAbstractFile): void;

  /**
   * Queues non-Markdown files after vault create and modify events.
   *
   * @param file - The changed file or folder.
   */
  onNonMarkdownFileChanged(file: TAbstractFile): void;

  /**
   * Record whether the current search matched a file it read.
   * A file that did not match is added to {@link SearchQueueComponent.unmatchedFiles} unless it was deleted.
   *
   * @param file - The file.
   * @param isMatched - Whether the search matched it.
   */
  setMatched(file: TFile, isMatched: boolean): void;

  /**
   * Creates, stores and synchronously seeds a queue with sorted vault files.
   * Exhaustion pauses processing; later events can add more files.
   *
   * @param options - Optional runnable lifecycle callbacks.
   * @returns The active file queue.
   */
  start(options?: SearchQueueStartOptions): ItemQueue<TFile>;

  /** Cancels and clears the active queue. */
  stop(): void;
}
