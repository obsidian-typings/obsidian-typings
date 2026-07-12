/**
 * A cookie stored in an Electron session.
 *
 * @public
 * @unofficial
 */
export interface ElectronCookie {
  /** The domain of the cookie; normalized with a preceding dot so that it is also valid for subdomains. */
  domain?: string;

  /** The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies. */
  expirationDate?: number;

  /** Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed. */
  hostOnly?: boolean;

  /** Whether the cookie is marked as HTTP only. */
  httpOnly?: boolean;

  /** The name of the cookie. */
  name: string;

  /** The path of the cookie. */
  path?: string;

  /** The Same Site policy applied to this cookie. */
  sameSite: 'lax' | 'no_restriction' | 'strict' | 'unspecified';

  /** Whether the cookie is marked as secure. */
  secure?: boolean;

  /** Whether the cookie is a session cookie or a persistent cookie with an expiration date. */
  session?: boolean;

  /** The value of the cookie. */
  value: string;
}
