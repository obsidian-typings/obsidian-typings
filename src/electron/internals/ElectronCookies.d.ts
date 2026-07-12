import type { ElectronCookie } from './ElectronCookie.d.ts';
import type { ElectronCookiesGetFilter } from './ElectronCookiesGetFilter.d.ts';
import type { ElectronCookiesSetDetails } from './ElectronCookiesSetDetails.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';

/**
 * Queries and modifies a session's cookies.
 *
 * @public
 * @unofficial
 */
export interface ElectronCookies {
  /**
   * Registers a listener for the `changed` event, emitted when a cookie is added, edited, removed, or expired.
   *
   * @param event - The event name.
   * @param listener - Called with the changed cookie, the cause of the change, and whether it was removed.
   * @returns This cookies instance.
   */
  addListener(event: 'changed', listener: (event: ElectronEvent, cookie: ElectronCookie, cause: 'evicted' | 'expired-overwrite' | 'expired' | 'explicit' | 'overwrite', removed: boolean) => void): this;

  /**
   * Writes any unwritten cookies data to disk.
   *
   * @returns A promise which resolves when the cookie store has been flushed.
   */
  flushStore(): Promise<void>;

  /**
   * Sends a request to get all cookies matching `filter`.
   *
   * @param filter - The filter to match cookies against.
   * @returns A promise which resolves to an array of cookie objects.
   */
  get(filter: ElectronCookiesGetFilter): Promise<ElectronCookie[]>;

  /**
   * Registers a listener for the `changed` event, emitted when a cookie is added, edited, removed, or expired.
   *
   * @param event - The event name.
   * @param listener - Called with the changed cookie, the cause of the change, and whether it was removed.
   * @returns This cookies instance.
   */
  on(event: 'changed', listener: (event: ElectronEvent, cookie: ElectronCookie, cause: 'evicted' | 'expired-overwrite' | 'expired' | 'explicit' | 'overwrite', removed: boolean) => void): this;

  /**
   * Registers a one-time listener for the `changed` event.
   *
   * @param event - The event name.
   * @param listener - Called with the changed cookie, the cause of the change, and whether it was removed.
   * @returns This cookies instance.
   */
  once(event: 'changed', listener: (event: ElectronEvent, cookie: ElectronCookie, cause: 'evicted' | 'expired-overwrite' | 'expired' | 'explicit' | 'overwrite', removed: boolean) => void): this;

  /**
   * Removes the cookies matching `url` and `name`.
   *
   * @param url - The URL associated with the cookie.
   * @param name - The name of the cookie to remove.
   * @returns A promise which resolves when the cookie has been removed.
   */
  remove(url: string, name: string): Promise<void>;

  /**
   * Removes the `changed` event listener.
   *
   * @param event - The event name.
   * @param listener - The previously registered listener to remove.
   * @returns This cookies instance.
   */
  removeListener(event: 'changed', listener: (event: ElectronEvent, cookie: ElectronCookie, cause: 'evicted' | 'expired-overwrite' | 'expired' | 'explicit' | 'overwrite', removed: boolean) => void): this;

  /**
   * Sets a cookie with `details`.
   *
   * @param details - The details of the cookie to set.
   * @returns A promise which resolves when the cookie has been set.
   */
  set(details: ElectronCookiesSetDetails): Promise<void>;
}
