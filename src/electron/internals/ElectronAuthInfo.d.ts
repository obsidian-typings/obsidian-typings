/**
 * Information about an authentication challenge.
 *
 * @public
 * @unofficial
 */
export interface ElectronAuthInfo {
  /** The host requesting authentication. */
  host: string;

  /** Whether the request is for a proxy. */
  isProxy: boolean;

  /** The port requesting authentication. */
  port: number;

  /** The authentication realm. */
  realm: string;

  /** The authentication scheme. */
  scheme: string;
}
