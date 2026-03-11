import type { requestUrl as requestUrlInstance } from 'obsidian';

export {};

declare global {
  /**
   * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
   *
   * @unofficial
   */
  const requestUrl: typeof requestUrlInstance;
}
