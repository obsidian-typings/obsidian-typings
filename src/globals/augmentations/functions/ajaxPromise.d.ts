export {};

declare global {
  /**
   * Sends an AJAX request and returns a promise.
   *
   * @param options - The options for the AJAX request.
   * @returns A promise that resolves to the response.
   * @example
   * ```ts
   * const response = await ajaxPromise({ url: 'https://example.com' });
   * console.log(response);
   * ```
   * @official
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
  function ajaxPromise(options: AjaxOptions): Promise<any>;
}
