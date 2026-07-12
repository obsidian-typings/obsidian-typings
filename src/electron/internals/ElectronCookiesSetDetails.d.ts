/**
 * Details used to set a cookie on an Electron session.
 *
 * @public
 * @unofficial
 */
export interface ElectronCookiesSetDetails {
  /** The domain of the cookie; normalized with a preceding dot so that it is also valid for subdomains. Empty by default if omitted. */
  domain?: string;

  /** The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions. */
  expirationDate?: number;

  /** Whether the cookie should be marked as HTTP only. */
  httpOnly?: boolean;

  /** The name of the cookie. Empty by default if omitted. */
  name?: string;

  /** The path of the cookie. Empty by default if omitted. */
  path?: string;

  /** The Same Site policy to apply to this cookie. */
  sameSite?: 'lax' | 'no_restriction' | 'strict' | 'unspecified';

  /** Whether the cookie should be marked as Secure. */
  secure?: boolean;

  /** The URL to associate the cookie with. The promise will be rejected if the URL is invalid. */
  url: string;

  /** The value of the cookie. Empty by default if omitted. */
  value?: string;
}
