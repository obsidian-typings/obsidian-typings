import type { EditorState } from './EditorState.d.ts';
import type { Extension } from './Extension.d.ts';
import type { StateFieldSpec } from './StateFieldSpec.d.ts';

/**
 * Fields can store additional information in an editor state and keep it in sync with the rest
 * of the state.
 *
 * @public
 * @unofficial
 */
export declare class StateField<Value> {
  private constructor();

  /**
   * Define a state field.
   *
   * @param config - The field configuration.
   * @returns The created state field.
   */
  static define<Value>(config: StateFieldSpec<Value>): StateField<Value>;

  /** Returns this field as an extension. */
  get extension(): Extension;

  /**
   * Returns an extension that enables this field and overrides the way it is initialized.
   *
   * @param create - The function to create the initial value.
   * @returns The extension.
   */
  init(create: (state: EditorState) => Value): Extension;
}
