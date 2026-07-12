/**
 * Details passed to a permission check handler.
 *
 * @public
 * @unofficial
 */
export interface ElectronPermissionCheckHandlerHandlerDetails {
  /** The origin of the frame embedding the frame that made the permission check. Only set for cross-origin sub frames. */
  embeddingOrigin?: string;

  /** Whether the frame making the request is the main frame. */
  isMainFrame: boolean;

  /** The type of media access being requested. */
  mediaType?: 'audio' | 'unknown' | 'video';

  /** The last URL the requesting frame loaded. Not provided for cross-origin sub frames. */
  requestingUrl?: string;

  /** The security origin of the `media` check. */
  securityOrigin?: string;
}
