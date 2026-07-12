/**
 * Options controlling how sockets are preconnected to an origin.
 *
 * @public
 * @unofficial
 */
export interface ElectronPreconnectOptions {
  /** Number of sockets to preconnect. Must be between 1 and 6. */
  numSockets?: number;

  /** URL for preconnect. Only the origin is relevant for opening the socket. */
  url: string;
}
