/**
 * Event data passed to DOMPurify hooks during sanitization.
 *
 * @public
 * @unofficial
 */
export interface HookEvent {
  /** Record of currently allowed tags. */
  allowedTags: Record<string, boolean>;

  /** The tag name of the current element being processed. */
  tagName: string;
}
