import type { request as requestInstance } from 'obsidian';

export {};

declare global {
  /**
   * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
   *
   * Returns the text value of the response.
   * @unofficial
   */
  var request: typeof requestInstance;
}
