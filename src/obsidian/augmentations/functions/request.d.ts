export {};

declare module 'obsidian' {
  /**
   * Similar to {@link fetch}, request a URL using HTTP/HTTPS, without any CORS restrictions.
   *
   * @param request - The request parameters.
   * @returns The promise that resolves to the text value of the response.
   *
   * @example
   * ```ts
   * console.log(await request({ url: 'https://google.com' }));
   * console.log(await request('https://google.com'));
   * ```
   *
   * @official
   * @since 0.12.11
   */

  export function request(request: RequestUrlParam | string): Promise<string>;
}
