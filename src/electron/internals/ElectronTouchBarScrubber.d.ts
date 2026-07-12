import type { ElectronScrubberItem } from './ElectronScrubberItem.d.ts';
import type { ElectronTouchBarScrubberConstructorOptions } from './ElectronTouchBarScrubberConstructorOptions.d.ts';

/**
 * A scrubber item for a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBarScrubber {
  /** Whether this scrubber is continuous. */
  continuous: boolean;

  /** The items in this scrubber. */
  items: ElectronScrubberItem[];

  /** The mode of this scrubber. */
  mode: 'fixed' | 'free';

  /** The style that selected items in the scrubber should have, overlaid on top of the item. */
  overlayStyle: 'background' | 'none' | 'outline';

  /** The style that selected items in the scrubber should have. */
  selectedStyle: 'background' | 'none' | 'outline';

  /** Whether to show the left / right selection arrows in this scrubber. */
  showArrowButtons: boolean;

  /**
   * Create new instance of {@link ElectronTouchBarScrubber}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarScrubberConstructorOptions);
}
