/**
 * Privileges granted to a custom scheme registered with a protocol.
 *
 * @public
 * @unofficial
 */
export interface ElectronPrivileges {
  /** Whether to allow registering ServiceWorkers for this scheme. */
  allowServiceWorkers?: boolean;

  /** Whether to bypass the Content Security Policy for resources served by this scheme. */
  bypassCSP?: boolean;

  /** Whether to enable CORS for this scheme. */
  corsEnabled?: boolean;

  /** Whether to treat the scheme as secure. */
  secure?: boolean;

  /** Whether to treat the scheme as a standard scheme (generic URI syntax). */
  standard?: boolean;

  /** Whether the scheme should be treated as streaming for `<video>` and `<audio>` elements. */
  stream?: boolean;

  /** Whether to support the fetch API for this scheme. */
  supportFetchAPI?: boolean;
}
