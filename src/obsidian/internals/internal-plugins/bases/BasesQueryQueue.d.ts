import type {
  App,
  Component,
  QueryController,
  TAbstractFile
} from 'obsidian';

/**
 * The file-change queue that streams vault files into a {@link QueryController}'s query and keeps the
 * results in sync as files are created, modified, renamed, or deleted.
 *
 * @public
 * @unofficial
 */
export interface BasesQueryQueue extends Component {
  /**
   * The app instance.
   */
  app: App;

  /**
   * The owning query controller, to which scan progress and removed results are reported.
   */
  dom: QueryController;

  /**
   * The inner cancellable batch queue that drives the scan, or `null` when the queue is stopped.
   */
  queue: unknown;

  /**
   * Re-queues a renamed file or a file whose metadata cache changed.
   *
   * @param file - The changed file.
   */
  onFileChanged(file: TAbstractFile): void;

  /**
   * Removes a deleted file from the queue and from the results.
   *
   * @param file - The deleted file.
   */
  onFileDeleted(file: TAbstractFile): void;

  /**
   * Queues a created or modified non-markdown file.
   *
   * @param file - The changed file.
   */
  onNonMarkdownFileChanged(file: TAbstractFile): void;

  /**
   * Starts a new scan, enqueuing every file in the vault.
   *
   * @returns The inner cancellable batch queue driving the scan.
   */
  start(): unknown;

  /**
   * Stops and cancels the current scan.
   */
  stop(): void;
}
