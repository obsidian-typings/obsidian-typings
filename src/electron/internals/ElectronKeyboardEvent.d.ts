/**
 * Modifier-key state describing how an accelerator-triggered event was activated.
 *
 * @public
 * @unofficial
 */
export interface ElectronKeyboardEvent {
  /** Whether an Alt key was used in an accelerator to trigger the event. */
  altKey?: boolean;

  /** Whether the Control key was used in an accelerator to trigger the event. */
  ctrlKey?: boolean;

  /** Whether a meta key was used in an accelerator to trigger the event. */
  metaKey?: boolean;

  /** Whether a Shift key was used in an accelerator to trigger the event. */
  shiftKey?: boolean;

  /** Whether an accelerator was used to trigger the event as opposed to another user gesture like a mouse click. */
  triggeredByAccelerator?: boolean;
}
