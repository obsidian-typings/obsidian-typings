/**
 * Input properties describing a keyboard event dispatched to the page.
 *
 * @public
 * @unofficial
 */
export interface ElectronInput {
  /** Equivalent to `KeyboardEvent.altKey`. */
  alt: boolean;

  /** Equivalent to `KeyboardEvent.code`. */
  code: string;

  /** Equivalent to `KeyboardEvent.controlKey`. */
  control: boolean;

  /** Equivalent to `KeyboardEvent.repeat`. */
  isAutoRepeat: boolean;

  /** Equivalent to `KeyboardEvent.isComposing`. */
  isComposing: boolean;

  /** Equivalent to `KeyboardEvent.key`. */
  key: string;

  /** Equivalent to `KeyboardEvent.location`. */
  location: number;

  /** Equivalent to `KeyboardEvent.metaKey`. */
  meta: boolean;

  /** The modifiers of the input event. */
  modifiers: string[];

  /** Equivalent to `KeyboardEvent.shiftKey`. */
  shift: boolean;

  /** Either `keyUp` or `keyDown`. */
  type: string;
}
