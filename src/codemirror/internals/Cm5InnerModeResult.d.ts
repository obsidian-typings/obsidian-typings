import type { Cm5Mode } from './Cm5Mode.d.ts';

/**
 * Result of CodeMirror 5's innerMode function.
 *
 * @public
 * @unofficial
 */
export interface Cm5InnerModeResult {
  /** The inner mode. */
  mode: Cm5Mode<unknown>;
  /** The inner mode's state. */
  state: unknown;
}
