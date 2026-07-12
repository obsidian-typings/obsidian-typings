/**
 * Details passed to a permission request handler.
 *
 * @public
 * @unofficial
 */
export interface ElectronPermissionRequestHandlerHandlerDetails {
  /** The URL of the `openExternal` request. */
  externalURL?: string;

  /** Whether the frame making the request is the main frame. */
  isMainFrame: boolean;

  /** The types of media access being requested. */
  mediaTypes?: Array<'audio' | 'video'>;

  /** The last URL the requesting frame loaded. */
  requestingUrl: string;

  /** The security origin of the `media` request. */
  securityOrigin?: string;
}
