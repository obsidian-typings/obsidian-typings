export {};

declare global {
  /**
   * Information about HTMLElement event listener.
   */
  interface EventListenerInfo {
    /**
     * Wrapper function of the event listener.
     *
     * @official
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- No other way.
    callback: Function;

    /**
     * The listener of the event.
     *
     * @official
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- No other way.
    listener: Function;

    /**
     * The options of the event listener.
     *
     * @official
     */
    options?: AddEventListenerOptions | boolean;

    /**
     * The selector of the event target.
     *
     * @official
     */
    selector: string;
  }
}
