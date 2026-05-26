import type { Cm5Editor } from './Cm5Editor.d.ts';

/**
 * A CodeMirror 5 key map, mapping key names to actions.
 *
 * @public
 * @unofficial
 */
export interface Cm5KeyMap {
  /** The action to perform when the key is pressed. */
  [keyName: string]: ((instance: Cm5Editor) => void) | false | string;
}
