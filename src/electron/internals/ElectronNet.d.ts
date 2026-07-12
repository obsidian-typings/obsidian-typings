import type { ElectronClientRequest } from './ElectronClientRequest.d.ts';
import type { ElectronClientRequestConstructorOptions } from './ElectronClientRequestConstructorOptions.d.ts';

/**
 * Issues HTTP/HTTPS requests using Chromium's native networking library.
 *
 * @public
 * @unofficial
 */
export interface ElectronNet {
  /**
   * A `boolean` property. Whether there is currently internet connection.
   *
   * A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites.
   * However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular
   * connection attempt to a particular remote site will be successful.
   */
  readonly online: boolean;

  /**
   * Whether there is currently internet connection.
   *
   * A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites.
   * However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular
   * connection attempt to a particular remote site will be successful.
   *
   * @returns Whether there is currently internet connection.
   */
  isOnline(): boolean;

  /**
   * Creates a `ClientRequest` instance using the provided `options` which are directly forwarded to the
   * `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP
   * requests according to the specified protocol scheme in the `options` object.
   *
   * @param options - The request options, or the request URL as a string.
   * @returns The created request.
   */
  request(options: ElectronClientRequestConstructorOptions | string): ElectronClientRequest;
}
