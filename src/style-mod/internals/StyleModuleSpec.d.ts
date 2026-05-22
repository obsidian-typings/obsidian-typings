import type { StyleSpec } from './StyleSpec.d.ts';

/**
 * A mapping of CSS selectors to style specifications.
 *
 * @public
 * @unofficial
 */
export interface StyleModuleSpec {
  /** A CSS selector mapped to its style specification. */
  [selector: string]: StyleSpec;
}
