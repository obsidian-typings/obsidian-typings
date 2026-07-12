import type { ElectronMessageEvent } from './ElectronMessageEvent.d.ts';

/**
 * The main-process end of a MessagePort channel.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessagePortMain {
  /**
   * Registers a listener for the `close` event, emitted when the remote end becomes disconnected.
   *
   * @param event - The event name.
   * @param listener - Called when the port closes.
   * @returns This message port instance.
   */
  addListener(event: 'close', listener: () => void): this;

  /**
   * Registers a listener for the `message` event, emitted when the port receives a message.
   *
   * @param event - The event name.
   * @param listener - Called with the received message event.
   * @returns This message port instance.
   */
  addListener(event: 'message', listener: (messageEvent: ElectronMessageEvent) => void): this;

  /** Disconnects the port, so it is no longer active. */
  close(): void;

  /**
   * Registers a listener for the `close` event, emitted when the remote end becomes disconnected.
   *
   * @param event - The event name.
   * @param listener - Called when the port closes.
   * @returns This message port instance.
   */
  on(event: 'close', listener: () => void): this;

  /**
   * Registers a listener for the `message` event, emitted when the port receives a message.
   *
   * @param event - The event name.
   * @param listener - Called with the received message event.
   * @returns This message port instance.
   */
  on(event: 'message', listener: (messageEvent: ElectronMessageEvent) => void): this;

  /**
   * Registers a one-time listener for the `close` event.
   *
   * @param event - The event name.
   * @param listener - Called when the port closes.
   * @returns This message port instance.
   */
  once(event: 'close', listener: () => void): this;

  /**
   * Registers a one-time listener for the `message` event.
   *
   * @param event - The event name.
   * @param listener - Called with the received message event.
   * @returns This message port instance.
   */
  once(event: 'message', listener: (messageEvent: ElectronMessageEvent) => void): this;

  /**
   * Sends a message from the port, and optionally, transfers ownership of objects to other browsing contexts.
   *
   * @param message - The message to send.
   * @param transfer - Message ports whose ownership is transferred with the message.
   */
  postMessage(message: unknown, transfer?: ElectronMessagePortMain[]): void;

  /**
   * Removes a previously registered `close` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This message port instance.
   */
  removeListener(event: 'close', listener: () => void): this;

  /**
   * Removes a previously registered `message` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This message port instance.
   */
  removeListener(event: 'message', listener: (messageEvent: ElectronMessageEvent) => void): this;

  /** Starts the sending of messages queued on the port. Messages will be queued until this method is called. */
  start(): void;
}
