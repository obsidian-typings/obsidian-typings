/**
 * Options for opening a notification in the editor.
 * @public
 * @unofficial
 */
export interface OpenNotificationOptions {
    /** Whether to display the notification at the bottom of the editor. */
    bottom?: boolean;

    /** Duration in milliseconds before the notification is automatically dismissed. */
    duration?: number;
}
