import type { ElectronCustomScheme } from './ElectronCustomScheme.d.ts';
import type { ElectronProtocolRequest } from './ElectronProtocolRequest.d.ts';
import type { ElectronProtocolResponse } from './ElectronProtocolResponse.d.ts';

/**
 * Registers and intercepts custom protocol schemes for a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronProtocol {
  /**
   * Intercepts `scheme` and uses `handler` as the new handler which sends a `Buffer` as a response.
   *
   * @param scheme - The scheme to intercept.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully intercepted.
   */
  interceptBufferProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: Buffer | ElectronProtocolResponse) => void) => void): boolean;

  /**
   * Intercepts `scheme` and uses `handler` as the new handler which sends a file as a response.
   *
   * @param scheme - The scheme to intercept.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully intercepted.
   */
  interceptFileProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | string) => void) => void): boolean;

  /**
   * Intercepts `scheme` and uses `handler` as the new handler which sends a new HTTP request as a response.
   *
   * @param scheme - The scheme to intercept.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully intercepted.
   */
  interceptHttpProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse) => void) => void): boolean;

  /**
   * Same as `registerStreamProtocol`, except that it replaces an existing protocol handler.
   *
   * @param scheme - The scheme to intercept.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully intercepted.
   */
  interceptStreamProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | NodeJS.ReadableStream) => void) => void): boolean;

  /**
   * Intercepts `scheme` and uses `handler` as the new handler which sends a `string` as a response.
   *
   * @param scheme - The scheme to intercept.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully intercepted.
   */
  interceptStringProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | string) => void) => void): boolean;

  /**
   * Returns whether `scheme` is already intercepted.
   *
   * @param scheme - The scheme to check.
   * @returns Whether the scheme is intercepted.
   */
  isProtocolIntercepted(scheme: string): boolean;

  /**
   * Returns whether `scheme` is already registered.
   *
   * @param scheme - The scheme to check.
   * @returns Whether the scheme is registered.
   */
  isProtocolRegistered(scheme: string): boolean;

  /**
   * Registers a protocol of `scheme` that will send a `Buffer` as a response.
   *
   * @param scheme - The scheme to register.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully registered.
   */
  registerBufferProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: Buffer | ElectronProtocolResponse) => void) => void): boolean;

  /**
   * Registers a protocol of `scheme` that will send a file as the response.
   *
   * @param scheme - The scheme to register.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully registered.
   */
  registerFileProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | string) => void) => void): boolean;

  /**
   * Registers a protocol of `scheme` that will send an HTTP request as a response.
   *
   * @param scheme - The scheme to register.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully registered.
   */
  registerHttpProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse) => void) => void): boolean;

  /**
   * Registers the given schemes as privileged. Can only be called before the `ready` event and only once.
   *
   * @param customSchemes - The schemes to register with their privileges.
   */
  registerSchemesAsPrivileged(customSchemes: ElectronCustomScheme[]): void;

  /**
   * Registers a protocol of `scheme` that will send a stream as a response.
   *
   * @param scheme - The scheme to register.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully registered.
   */
  registerStreamProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | NodeJS.ReadableStream) => void) => void): boolean;

  /**
   * Registers a protocol of `scheme` that will send a `string` as a response.
   *
   * @param scheme - The scheme to register.
   * @param handler - Called with the request and a callback to send the response.
   * @returns Whether the protocol was successfully registered.
   */
  registerStringProtocol(scheme: string, handler: (request: ElectronProtocolRequest, callback: (response: ElectronProtocolResponse | string) => void) => void): boolean;

  /**
   * Removes the interceptor installed for `scheme` and restores its original handler.
   *
   * @param scheme - The scheme to unintercept.
   * @returns Whether the protocol was successfully unintercepted.
   */
  uninterceptProtocol(scheme: string): boolean;

  /**
   * Unregisters the custom protocol of `scheme`.
   *
   * @param scheme - The scheme to unregister.
   * @returns Whether the protocol was successfully unregistered.
   */
  unregisterProtocol(scheme: string): boolean;
}
