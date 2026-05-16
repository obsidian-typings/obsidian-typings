import type {
  EditorState,
  Extension,
  FacetReader,
  StateField
} from '@codemirror/state';

import type { FacetConfig } from '../internals/FacetConfig.d.ts';

export {};

declare module '@codemirror/state' {
  interface Facet<Input, Output> {
    /**
     * Create an extension that computes a value for the facet from a state.
     *
     * @param deps - The dependencies.
     * @param get - The getter function.
     * @returns The extension.
     * @official
     */
    compute(deps: readonly ('doc' | 'selection' | FacetReader<unknown> | StateField<unknown>)[], get: (state: EditorState) => Input): Extension;

    /**
     * Create an extension that computes zero or more values for this facet from a state.
     *
     * @param deps - The dependencies.
     * @param get - The getter function.
     * @returns The extension.
     * @official
     */
    computeN(deps: readonly ('doc' | 'selection' | FacetReader<unknown> | StateField<unknown>)[], get: (state: EditorState) => readonly Input[]): Extension;

    /**
     * Shorthand method for registering a facet source with a state field as input.
     *
     * @param field - The state field.
     * @returns The extension.
     * @official
     */
    from<T extends Input>(field: StateField<T>): Extension;

    /**
     * Shorthand method for registering a facet source with a state field as input,
     * using a getter function.
     *
     * @param field - The state field.
     * @param get - The getter function.
     * @returns The extension.
     * @official
     */
    from<T>(field: StateField<T>, get: (value: T) => Input): Extension;

    /**
     * Returns an extension that adds the given value to this facet.
     *
     * @param value - The value to add.
     * @returns The extension.
     * @official
     */
    of(value: Input): Extension;

    /**
     * Returns a facet reader for this facet.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link reader} instead.
     */
    get reader__(): FacetReader<Output>;
  }

  namespace Facet {
    /**
     * Define a new facet.
     *
     * @param config - The facet configuration.
     * @returns The new facet.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Facet.define} instead.
     */
    function define__<Input, Output = readonly Input[]>(config?: FacetConfig<Input, Output>): Facet<Input, Output>;
  }
}
