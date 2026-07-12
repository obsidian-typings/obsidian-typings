/**
 * An action button shown on a native notification.
 *
 * @public
 * @unofficial
 */
export interface ElectronNotificationAction {
  /** The label for the given action. */
  text?: string;

  /** The type of action, can be `button`. */
  type: 'button';
}
