/**
 * Details about an authentication request emitted with the `login` event.
 *
 * @public
 * @unofficial
 */
export interface ElectronAuthenticationResponseDetails {
  /** The URL of the request that triggered the authentication. */
  url: string;
}
