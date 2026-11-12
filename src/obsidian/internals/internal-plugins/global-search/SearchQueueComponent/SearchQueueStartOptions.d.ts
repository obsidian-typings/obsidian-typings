/**
 * Optional callbacks for a search queue's runnable lifecycle.
 *
 * @public
 * @unofficial
 */
export interface SearchQueueStartOptions {
  /**
   * Whether the new query only narrows the previous one, so files the previous search did not match are skipped.
   * When omitted or `false`, the record of unmatched files is cleared.
   */
  narrows?: boolean;

  /** Called when the queue is cancelled. */
  onCancel?(): void;

  /** Called when processing starts or resumes. */
  onStart?(): void;

  /** Called when processing pauses after exhaustion. */
  onStop?(): void;
}
