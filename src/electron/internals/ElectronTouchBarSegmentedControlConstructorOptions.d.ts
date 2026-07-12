import type { ElectronSegmentedControlSegment } from './ElectronSegmentedControlSegment.d.ts';

/**
 * Options for creating a {@link ElectronTouchBarSegmentedControl}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarSegmentedControlConstructorOptions {
  /** The selection mode of the control. */
  mode?: 'buttons' | 'multiple' | 'single';

  /** An array of segments to place in this control. */
  segments: ElectronSegmentedControlSegment[];

  /** Style of the segments. */
  segmentStyle?: 'automatic' | 'capsule' | 'round-rect' | 'rounded' | 'separated' | 'small-square' | 'textured-rounded' | 'textured-square';

  /**
   * The index of the currently selected segment, updated automatically with user interaction. When the mode is
   * `multiple` it will be the last selected item.
   */
  selectedIndex?: number;

  /** Callback invoked when the user selects a new segment. */
  change?(selectedIndex: number, isSelected: boolean): void;
}
