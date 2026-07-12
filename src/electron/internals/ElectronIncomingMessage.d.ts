/**
 * An HTTP response message returned by a `ClientRequest`.
 *
 * @public
 * @unofficial
 */
export declare class ElectronIncomingMessage {
  /**
   * A `Record<string, string | string[]>` representing the HTTP response headers. The `headers` object is formatted
   * as follows:
   *
   * - All header names are lowercased.
   * - Duplicates of `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`,
   *   `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`,
   *   `referer`, `retry-after`, `server`, or `user-agent` are discarded.
   * - `set-cookie` is always an array. Duplicates are added to the array.
   * - For duplicate `cookie` headers, the values are joined together with `'; '`.
   * - For all other headers, the values are joined together with `', '`.
   */
  headers: Record<string, string | string[]>;

  /**
   * A `string` indicating the HTTP protocol version number. Typical values are `'1.0'` or `'1.1'`. Additionally
   * `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the
   * HTTP major and minor version numbers.
   */
  httpVersion: string;

  /** An `Integer` indicating the HTTP protocol major version number. */
  httpVersionMajor: number;

  /** An `Integer` indicating the HTTP protocol minor version number. */
  httpVersionMinor: number;

  /**
   * A `string[]` containing the raw HTTP response headers exactly as they were received. The keys and values are in
   * the same list. It is not a list of tuples. So, the even-numbered offsets are key values, and the odd-numbered
   * offsets are the associated values. Header names are not lowercased, and duplicates are not merged.
   */
  rawHeaders: string[];

  /** An `Integer` indicating the HTTP response status code. */
  statusCode: number;

  /** A `string` representing the HTTP status message. */
  statusMessage: string;

  /**
   * Registers a listener for the given response event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `IncomingMessage` instance.
   */
  addListener(event: 'aborted', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'data', listener: (chunk: Buffer) => void): this;
  /** */
  addListener(event: 'end', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'error', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the given response event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `IncomingMessage` instance.
   */
  on(event: 'aborted', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'data', listener: (chunk: Buffer) => void): this;
  /** */
  on(event: 'end', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'error', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the given response event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `IncomingMessage` instance.
   */
  once(event: 'aborted', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'data', listener: (chunk: Buffer) => void): this;
  /** */
  once(event: 'end', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'error', listener: (...args: unknown[]) => void): this;

  /**
   * Removes the given listener for the given response event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `IncomingMessage` instance.
   */
  removeListener(event: 'aborted', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'data', listener: (chunk: Buffer) => void): this;
  /** */
  removeListener(event: 'end', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'error', listener: (...args: unknown[]) => void): this;
}
