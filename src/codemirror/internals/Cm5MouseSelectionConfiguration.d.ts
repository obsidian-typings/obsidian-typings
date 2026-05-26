import type { Cm5SelectionUnit } from './Cm5SelectionUnit.d.ts';

/**
 * Configuration for mouse selection behavior in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5MouseSelectionConfiguration {
  /** Whether to add a new range to the existing selection. */
  addNew?: boolean;
  /** Whether to extend the existing selection range. */
  extend?: boolean;
  /** Whether dragged content is moved (`true`) or copied (`false`). */
  moveOnDrag?: boolean;
  /** The unit by which to select. */
  unit?: 'char' | 'line' | 'rectangle' | 'word' | Cm5SelectionUnit;
}
