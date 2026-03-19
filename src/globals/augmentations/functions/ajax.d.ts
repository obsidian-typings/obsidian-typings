export {};

declare global {
  /**
   * Sends an AJAX request.
   *
   * @param options - The options for the AJAX request.
   * @example
   * ```ts
   * ajax({
   *     url: 'https://example.com',
   *     success: (response) => {
   *         console.log(response);
   *     },
   *     error: (error) => {
   *         console.error(error);
   *     }
   * });
   * ```
   * @official
   */
  function ajax(options: AjaxOptions): void;
}
