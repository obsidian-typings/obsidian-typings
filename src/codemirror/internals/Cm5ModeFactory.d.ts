import type { Cm5EditorConfiguration } from './Cm5EditorConfiguration.d.ts';
import type { Cm5Mode } from './Cm5Mode.d.ts';

/**
 * A factory function that creates a {@link Cm5Mode} given an editor configuration.
 *
 * @typeParam T - The type of the mode's state object.
 * @public
 * @unofficial
 */
export interface Cm5ModeFactory<T> {
  (config: Cm5EditorConfiguration, modeOptions?: unknown): Cm5Mode<T>;
}
