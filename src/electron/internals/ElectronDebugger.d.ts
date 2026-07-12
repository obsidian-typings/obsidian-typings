import type { ElectronEvent } from './ElectronEvent.d.ts';

/**
 * A debugger instance for a web contents, used to communicate with the Chrome DevTools Protocol.
 *
 * @public
 * @unofficial
 */
export interface ElectronDebugger {
  /**
   * Registers a listener for the `detach` event, emitted when the debugging session is terminated.
   *
   * @param event - The event name.
   * @param listener - Called with the event and the reason for detaching.
   * @returns This debugger instance.
   */
  addListener(event: 'detach', listener: (event: ElectronEvent, reason: string) => void): this;

  /**
   * Registers a listener for the `message` event, emitted when the debugging target issues an instrumentation event.
   *
   * @param event - The event name.
   * @param listener - Called with the event, method name, event parameters, and session id.
   * @returns This debugger instance.
   */
  addListener(event: 'message', listener: (event: ElectronEvent, method: string, params: unknown, sessionId: string) => void): this;

  /**
   * Attaches the debugger to the web contents.
   *
   * @param protocolVersion - The requested debugging protocol version.
   */
  attach(protocolVersion?: string): void;

  /** Detaches the debugger from the web contents. */
  detach(): void;

  /**
   * Returns whether a debugger is attached to the web contents.
   *
   * @returns Whether a debugger is attached.
   */
  isAttached(): boolean;

  /**
   * Registers a listener for the `detach` event, emitted when the debugging session is terminated.
   *
   * @param event - The event name.
   * @param listener - Called with the event and the reason for detaching.
   * @returns This debugger instance.
   */
  on(event: 'detach', listener: (event: ElectronEvent, reason: string) => void): this;

  /**
   * Registers a listener for the `message` event, emitted when the debugging target issues an instrumentation event.
   *
   * @param event - The event name.
   * @param listener - Called with the event, method name, event parameters, and session id.
   * @returns This debugger instance.
   */
  on(event: 'message', listener: (event: ElectronEvent, method: string, params: unknown, sessionId: string) => void): this;

  /**
   * Registers a one-time listener for the `detach` event.
   *
   * @param event - The event name.
   * @param listener - Called with the event and the reason for detaching.
   * @returns This debugger instance.
   */
  once(event: 'detach', listener: (event: ElectronEvent, reason: string) => void): this;

  /**
   * Registers a one-time listener for the `message` event.
   *
   * @param event - The event name.
   * @param listener - Called with the event, method name, event parameters, and session id.
   * @returns This debugger instance.
   */
  once(event: 'message', listener: (event: ElectronEvent, method: string, params: unknown, sessionId: string) => void): this;

  /**
   * Removes a previously registered `detach` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This debugger instance.
   */
  removeListener(event: 'detach', listener: (event: ElectronEvent, reason: string) => void): this;

  /**
   * Removes a previously registered `message` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This debugger instance.
   */
  removeListener(event: 'message', listener: (event: ElectronEvent, method: string, params: unknown, sessionId: string) => void): this;

  /**
   * Sends a given command to the debugging target.
   *
   * @param method - The command method name.
   * @param commandParams - The parameters required by the command.
   * @param sessionId - The session id for the command.
   * @returns A promise resolving with the command response.
   */
  sendCommand(method: string, commandParams?: unknown, sessionId?: string): Promise<unknown>;
}
