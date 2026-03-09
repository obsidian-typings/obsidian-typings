import type { PropertyWidget } from '../PropertyWidget.d.ts';

/**
 * Information about a property's expected and inferred widget types.
 * @public
 * @unofficial
 */
export interface TypeInfo {
  /** The explicitly assigned property widget type. */
  expected: PropertyWidget;

  /** The property widget type inferred from the value. */
  inferred: PropertyWidget;
}
