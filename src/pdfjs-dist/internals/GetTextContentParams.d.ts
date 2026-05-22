/**
 * Parameters for getting page text content.
 *
 * @public
 * @unofficial
 */
export interface GetTextContentParams {
  /** Whether to disable text normalization. */
  disableNormalization?: boolean;
  /** Whether to include marked content. */
  includeMarkedContent?: boolean;
}
