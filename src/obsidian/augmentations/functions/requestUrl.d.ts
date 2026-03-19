export {};

declare module 'obsidian' {
  /**
   * Similar to {@link fetch}, request a URL using HTTP/HTTPS, without any CORS restrictions.
   *
   * @param request - The request parameters.
   * @returns The response.
   *
   * @example
   * ```ts
   * const response = requestUrl({ url: 'https://google.com' });
   * console.log(await response);
   * console.log(await response.arrayBuffer());
   * console.log(await response.json());
   * console.log(await response.text());
   * console.log(await requestUrl('https://google.com'));
   * ```
   *
   * @official
   */

  export function requestUrl(request: RequestUrlParam | string): RequestUrlResponsePromise;
}
