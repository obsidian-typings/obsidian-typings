import type { ElectronAuthInfo } from './ElectronAuthInfo.d.ts';
import type { ElectronClientRequestConstructorOptions } from './ElectronClientRequestConstructorOptions.d.ts';
import type { ElectronIncomingMessage } from './ElectronIncomingMessage.d.ts';
import type { ElectronUploadProgress } from './ElectronUploadProgress.d.ts';

/**
 * An HTTP/HTTPS request issued through the `net` module.
 *
 * @public
 * @unofficial
 */
export declare class ElectronClientRequest {
  /**
   * A `boolean` specifying whether the request will use HTTP chunked transfer encoding or not. The property is
   * readable and writable, however it can be set only before the first write operation as the HTTP headers are not
   * yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.
   *
   * Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed
   * in small chunks instead of being internally buffered inside Electron process memory.
   *
   * @default `false`
   */
  chunkedEncoding: boolean;

  /**
   * Create new instance of {@link ElectronClientRequest}.
   *
   * @param options - The request options, or the request URL as a string.
   */
  constructor(options: ElectronClientRequestConstructorOptions | string);

  /**
   * Cancels an ongoing HTTP transaction. If the request has already emitted the `close` event, the abort operation
   * will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is
   * an ongoing response object, it will emit the `aborted` event.
   */
  abort(): void;

  /**
   * Registers a listener for the given request event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ClientRequest` instance.
   */
  addListener(event: 'abort', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'close', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'error', listener: (error: Error) => void): this;
  /** */
  addListener(event: 'finish', listener: (...args: unknown[]) => void): this;
  /** */
  addListener(event: 'login', listener: (authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;
  /** */
  addListener(event: 'redirect', listener: (statusCode: number, method: string, redirectUrl: string, responseHeaders: Record<string, string[]>) => void): this;
  /** */
  addListener(event: 'response', listener: (response: ElectronIncomingMessage) => void): this;

  /**
   * Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish`
   * event is emitted just after the end operation.
   *
   * @param chunk - The final chunk of request body data.
   * @param encoding - The encoding of `chunk`.
   * @param callback - Invoked after the chunk content has been delivered to the Chromium networking layer.
   */
  end(chunk?: Buffer | string, encoding?: string, callback?: () => void): void;

  /**
   * Continues any pending redirection. Can only be called during a `'redirect'` event.
   */
  followRedirect(): void;

  /**
   * The value of a previously set extra header name.
   *
   * @param name - The header name.
   * @returns The header value.
   */
  getHeader(name: string): string;

  /**
   * You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data
   * transfer.
   *
   * @returns The current upload progress.
   */
  getUploadProgress(): ElectronUploadProgress;

  /**
   * Registers a listener for the given request event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ClientRequest` instance.
   */
  on(event: 'abort', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'close', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'error', listener: (error: Error) => void): this;
  /** */
  on(event: 'finish', listener: (...args: unknown[]) => void): this;
  /** */
  on(event: 'login', listener: (authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;
  /** */
  on(event: 'redirect', listener: (statusCode: number, method: string, redirectUrl: string, responseHeaders: Record<string, string[]>) => void): this;
  /** */
  on(event: 'response', listener: (response: ElectronIncomingMessage) => void): this;

  /**
   * Registers a one-time listener for the given request event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ClientRequest` instance.
   */
  once(event: 'abort', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'close', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'error', listener: (error: Error) => void): this;
  /** */
  once(event: 'finish', listener: (...args: unknown[]) => void): this;
  /** */
  once(event: 'login', listener: (authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;
  /** */
  once(event: 'redirect', listener: (statusCode: number, method: string, redirectUrl: string, responseHeaders: Record<string, string[]>) => void): this;
  /** */
  once(event: 'response', listener: (response: ElectronIncomingMessage) => void): this;

  /**
   * Removes a previously set extra header name. This method can be called only before first write. Trying to call it
   * after the first write will throw an error.
   *
   * @param name - The header name to remove.
   */
  removeHeader(name: string): void;

  /**
   * Removes the given listener for the given request event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ClientRequest` instance.
   */
  removeListener(event: 'abort', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'close', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'error', listener: (error: Error) => void): this;
  /** */
  removeListener(event: 'finish', listener: (...args: unknown[]) => void): this;
  /** */
  removeListener(event: 'login', listener: (authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;
  /** */
  removeListener(event: 'redirect', listener: (statusCode: number, method: string, redirectUrl: string, responseHeaders: Record<string, string[]>) => void): this;
  /** */
  removeListener(event: 'response', listener: (response: ElectronIncomingMessage) => void): this;

  /**
   * Adds an extra HTTP header. The header name will be issued as-is without lowercasing. It can be called only before
   * first write. Calling this method after the first write will throw an error. If the passed value is not a
   * `string`, its `toString()` method will be called to obtain the final value.
   *
   * @param name - The header name.
   * @param value - The header value.
   */
  setHeader(name: string, value: string): void;

  /**
   * Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on
   * the wire. After the first write operation, it is not allowed to add or remove a custom header.
   *
   * @param chunk - A chunk of request body data.
   * @param encoding - The encoding of `chunk`.
   * @param callback - Invoked after the chunk content has been delivered to the Chromium networking layer.
   */
  write(chunk: Buffer | string, encoding?: string, callback?: () => void): void;
}
