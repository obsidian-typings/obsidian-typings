/**
 * Base shape shared by every Electron input event passed to {@link ElectronWebContents.sendInputEvent}.
 *
 * @public
 * @unofficial
 */
export interface ElectronInputEvent {
  /** The modifier keys held during the event. */
  modifiers?: Array<
    | 'alt'
    | 'capsLock'
    | 'cmd'
    | 'command'
    | 'control'
    | 'ctrl'
    | 'isAutoRepeat'
    | 'isKeypad'
    | 'left'
    | 'leftButtonDown'
    | 'meta'
    | 'middleButtonDown'
    | 'numLock'
    | 'right'
    | 'rightButtonDown'
    | 'shift'
  >;
}
