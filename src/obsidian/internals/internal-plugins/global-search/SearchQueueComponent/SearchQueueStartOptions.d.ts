/**
 * Optional callbacks for a search queue's runnable lifecycle.
 *
 * @public
 * @unofficial
 */
export interface SearchQueueStartOptions {
  /** Called when the queue is cancelled. */
  onCancel?(): void;

  /** Called when processing starts or resumes. */
  onStart?(): void;

  /** Called when processing pauses after exhaustion. */
  onStop?(): void;
}
