import type { ElectronSegmentedControlSegment } from './ElectronSegmentedControlSegment.d.ts';
import type { ElectronTouchBarSegmentedControlConstructorOptions } from './ElectronTouchBarSegmentedControlConstructorOptions.d.ts';

/**
 * A segmented control item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarSegmentedControl {
  /** The current selection mode of the control. */
  mode: 'buttons' | 'multiple' | 'single';

  /** The segments in this control. */
  segments: ElectronSegmentedControlSegment[];

  /** The control's current segment style. */
  segmentStyle: string;

  /** The currently selected segment. */
  selectedIndex: number;

  /**
   * Create new instance of {@link ElectronTouchBarSegmentedControl}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarSegmentedControlConstructorOptions);
}
