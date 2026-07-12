/**
 * Filter used to query cookies from an Electron session.
 *
 * @public
 * @unofficial
 */
export interface ElectronCookiesGetFilter {
  /** Retrieves cookies whose domains match or are subdomains of `domains`. */
  domain?: string;

  /** Filters cookies by name. */
  name?: string;

  /** Retrieves cookies whose path matches `path`. */
  path?: string;

  /** Filters cookies by their Secure property. */
  secure?: boolean;

  /** Filters out session or persistent cookies. */
  session?: boolean;

  /** Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs. */
  url?: string;
}
