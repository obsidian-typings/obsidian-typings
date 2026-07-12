import type { ElectronTouchBarButton } from './ElectronTouchBarButton.d.ts';
import type { ElectronTouchBarColorPicker } from './ElectronTouchBarColorPicker.d.ts';
import type { ElectronTouchBarGroup } from './ElectronTouchBarGroup.d.ts';
import type { ElectronTouchBarLabel } from './ElectronTouchBarLabel.d.ts';
import type { ElectronTouchBarPopover } from './ElectronTouchBarPopover.d.ts';
import type { ElectronTouchBarScrubber } from './ElectronTouchBarScrubber.d.ts';
import type { ElectronTouchBarSegmentedControl } from './ElectronTouchBarSegmentedControl.d.ts';
import type { ElectronTouchBarSlider } from './ElectronTouchBarSlider.d.ts';
import type { ElectronTouchBarSpacer } from './ElectronTouchBarSpacer.d.ts';

/**
 * Options for creating a {@link ElectronTouchBar}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarConstructorOptions {
  /** The item that will replace the "esc" button on the touch bar when set. */
  escapeItem?: ElectronTouchBarButton | ElectronTouchBarColorPicker | ElectronTouchBarGroup | ElectronTouchBarLabel | ElectronTouchBarPopover | ElectronTouchBarScrubber | ElectronTouchBarSegmentedControl | ElectronTouchBarSlider | ElectronTouchBarSpacer | null;

  /** The items to display in the touch bar. */
  items?: (ElectronTouchBarButton | ElectronTouchBarColorPicker | ElectronTouchBarGroup | ElectronTouchBarLabel | ElectronTouchBarPopover | ElectronTouchBarScrubber | ElectronTouchBarSegmentedControl | ElectronTouchBarSlider | ElectronTouchBarSpacer)[];
}
