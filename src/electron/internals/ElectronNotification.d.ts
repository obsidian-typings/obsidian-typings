import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronNotificationAction } from './ElectronNotificationAction.d.ts';
import type { ElectronNotificationConstructorOptions } from './ElectronNotificationConstructorOptions.d.ts';

/**
 * Electron Notification for creating and showing native OS notifications.
 *
 * @public
 * @unofficial
 */
export declare class ElectronNotification {
  /** A `NotificationAction[]` property representing the actions of the notification. */
  actions: ElectronNotificationAction[];

  /** A `string` property representing the body of the notification. */
  body: string;

  /** A `string` property representing the close button text of the notification. */
  closeButtonText: string;

  /** A `boolean` property representing whether the notification has a reply action. */
  hasReply: boolean;

  /** A `string` property representing the reply placeholder of the notification. */
  replyPlaceholder: string;

  /** A `boolean` property representing whether the notification is silent. */
  silent: boolean;

  /** A `string` property representing the sound of the notification. */
  sound: string;

  /** A `string` property representing the subtitle of the notification. */
  subtitle: string;

  /**
   * A `string` property representing the type of timeout duration for the notification. Can be `default` or `never`.
   *
   * If `timeoutType` is set to `never`, the notification never expires. It stays open until closed by the calling API or the user. `linux` and `win32` only.
   */
  timeoutType: 'default' | 'never';

  /** A `string` property representing the title of the notification. */
  title: string;

  /** A `string` property representing the custom Toast XML of the notification. `win32` only. */
  toastXml: string;

  /**
   * A `string` property representing the urgency level of the notification. Can be `normal`, `critical`, or `low`.
   *
   * Default is `low`. `linux` only.
   */
  urgency: 'critical' | 'low' | 'normal';

  /**
   * Create a new instance of {@link ElectronNotification}.
   *
   * @param options - Options for constructing the notification.
   */
  constructor(options?: ElectronNotificationConstructorOptions);

  /**
   * Registers an event listener that is invoked when one of the notification's actions is activated.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the index of the activated action.
   * @returns This notification instance.
   */
  addListener(event: 'action', listener: (event: ElectronEvent, index: number) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is clicked by the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  addListener(event: 'click', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is closed by manual intervention from the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  addListener(event: 'close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when an error is encountered while creating and showing the native notification. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the error encountered during execution of the `show()` method.
   * @returns This notification instance.
   */
  addListener(event: 'failed', listener: (event: ElectronEvent, error: string) => void): this;
  /**
   * Registers an event listener that is invoked when the user clicks the "Reply" button on a notification with `hasReply: true`. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the string the user entered into the inline reply field.
   * @returns This notification instance.
   */
  addListener(event: 'reply', listener: (event: ElectronEvent, reply: string) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is shown to the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  addListener(event: 'show', listener: (event: ElectronEvent) => void): this;

  /** Dismisses the notification. */
  close(): void;

  /**
   * Whether or not desktop notifications are supported on the current system.
   *
   * @returns `true` if desktop notifications are supported.
   */
  static isSupported(): boolean;

  /**
   * Registers an event listener that is invoked when one of the notification's actions is activated.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the index of the activated action.
   * @returns This notification instance.
   */
  on(event: 'action', listener: (event: ElectronEvent, index: number) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is clicked by the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  on(event: 'click', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is closed by manual intervention from the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  on(event: 'close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers an event listener that is invoked when an error is encountered while creating and showing the native notification. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the error encountered during execution of the `show()` method.
   * @returns This notification instance.
   */
  on(event: 'failed', listener: (event: ElectronEvent, error: string) => void): this;
  /**
   * Registers an event listener that is invoked when the user clicks the "Reply" button on a notification with `hasReply: true`. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the string the user entered into the inline reply field.
   * @returns This notification instance.
   */
  on(event: 'reply', listener: (event: ElectronEvent, reply: string) => void): this;
  /**
   * Registers an event listener that is invoked when the notification is shown to the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  on(event: 'show', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time event listener that is invoked when one of the notification's actions is activated.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the index of the activated action.
   * @returns This notification instance.
   */
  once(event: 'action', listener: (event: ElectronEvent, index: number) => void): this;
  /**
   * Registers a one-time event listener that is invoked when the notification is clicked by the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  once(event: 'click', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers a one-time event listener that is invoked when the notification is closed by manual intervention from the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  once(event: 'close', listener: (event: ElectronEvent) => void): this;
  /**
   * Registers a one-time event listener that is invoked when an error is encountered while creating and showing the native notification. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the error encountered during execution of the `show()` method.
   * @returns This notification instance.
   */
  once(event: 'failed', listener: (event: ElectronEvent, error: string) => void): this;
  /**
   * Registers a one-time event listener that is invoked when the user clicks the "Reply" button on a notification with `hasReply: true`. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the string the user entered into the inline reply field.
   * @returns This notification instance.
   */
  once(event: 'reply', listener: (event: ElectronEvent, reply: string) => void): this;
  /**
   * Registers a one-time event listener that is invoked when the notification is shown to the user.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This notification instance.
   */
  once(event: 'show', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes the event listener for one of the notification's actions being activated.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'action', listener: (event: ElectronEvent, index: number) => void): this;
  /**
   * Removes the event listener for the notification being clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'click', listener: (event: ElectronEvent) => void): this;
  /**
   * Removes the event listener for the notification being closed.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'close', listener: (event: ElectronEvent) => void): this;
  /**
   * Removes the event listener for the notification failing to show.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'failed', listener: (event: ElectronEvent, error: string) => void): this;
  /**
   * Removes the event listener for the notification's inline reply.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'reply', listener: (event: ElectronEvent, reply: string) => void): this;
  /**
   * Removes the event listener for the notification being shown.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This notification instance.
   */
  removeListener(event: 'show', listener: (event: ElectronEvent) => void): this;

  /**
   * Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.
   *
   * If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.
   */
  show(): void;
}
