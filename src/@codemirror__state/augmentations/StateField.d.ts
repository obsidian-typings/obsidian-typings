import type {
  EditorState,
  Extension
} from '@codemirror/state';

import type { StateFieldSpec } from '../internals/StateFieldSpec.d.ts';

export {};

declare module '@codemirror/state' {
  interface StateField<Value> {
    /**
     * State field instances can be used as Extension values to enable the field in a given state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link extension} instead.
     */
    readonly extension__?: Extension;

    /**
     * Returns an extension that enables this field and overrides the way it is initialized.
     *
     * @param create - The initializer function.
     * @returns The extension.
     * @official
     */
    init(create: (state: EditorState) => Value): Extension;
  }

  namespace StateField {
    /**
     * Define a state field.
     *
     * @param config - The state field spec.
     * @returns The new state field.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link StateField.define} instead.
     */
    function define__<Value>(config: StateFieldSpec<Value>): StateField<Value>;
  }
}
