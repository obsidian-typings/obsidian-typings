import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronNotificationAction } from './ElectronNotificationAction.d.ts';

/**
 * Options for constructing an {@link ElectronNotification}.
 *
 * @public
 * @unofficial
 */
export interface ElectronNotificationConstructorOptions {
  /** Actions to add to the notification. Please read the available actions and limitations in the {@link ElectronNotificationAction} documentation. `darwin` only. */
  actions?: ElectronNotificationAction[];

  /** The body text of the notification, which will be displayed below the title or subtitle. */
  body?: string;

  /** A custom title for the close button of an alert. An empty string will cause the default localized text to be used. `darwin` only. */
  closeButtonText?: string;

  /** Whether or not to add an inline reply option to the notification. `darwin` only. */
  hasReply?: boolean;

  /** An icon to use in the notification. */
  icon?: ElectronNativeImage | string;

  /** The placeholder to write in the inline reply input field. `darwin` only. */
  replyPlaceholder?: string;

  /** Whether or not to emit an OS notification noise when showing the notification. */
  silent?: boolean;

  /** The name of the sound file to play when the notification is shown. `darwin` only. */
  sound?: string;

  /** A subtitle for the notification, which will be displayed below the title. `darwin` only. */
  subtitle?: string;

  /** The timeout duration of the notification. Can be `default` or `never`. `linux` and `win32` only. */
  timeoutType?: 'default' | 'never';

  /** A title for the notification, which will be shown at the top of the notification window when it is shown. */
  title?: string;

  /** A custom description of the notification on Windows superseding all properties above. Provides full customization of design and behavior of the notification. `win32` only. */
  toastXml?: string;

  /** The urgency level of the notification. Can be `normal`, `critical`, or `low`. `linux` only. */
  urgency?: 'critical' | 'low' | 'normal';
}
