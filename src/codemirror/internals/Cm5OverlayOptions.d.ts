/**
 * Options for adding a mode overlay in CodeMirror 5.
 *
 * @public
 * @unofficial
 */
export interface Cm5OverlayOptions {
  /** Whether the overlay styling overrides the base mode entirely. */
  opaque?: boolean;
  /** The priority of the overlay. */
  priority?: number;
}
