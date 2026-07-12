import type { ElectronTouchBarButton } from './ElectronTouchBarButton.d.ts';
import type { ElectronTouchBarColorPicker } from './ElectronTouchBarColorPicker.d.ts';
import type { ElectronTouchBarConstructorOptions } from './ElectronTouchBarConstructorOptions.d.ts';
import type { ElectronTouchBarGroup } from './ElectronTouchBarGroup.d.ts';
import type { ElectronTouchBarLabel } from './ElectronTouchBarLabel.d.ts';
import type { ElectronTouchBarOtherItemsProxy } from './ElectronTouchBarOtherItemsProxy.d.ts';
import type { ElectronTouchBarPopover } from './ElectronTouchBarPopover.d.ts';
import type { ElectronTouchBarScrubber } from './ElectronTouchBarScrubber.d.ts';
import type { ElectronTouchBarSegmentedControl } from './ElectronTouchBarSegmentedControl.d.ts';
import type { ElectronTouchBarSlider } from './ElectronTouchBarSlider.d.ts';
import type { ElectronTouchBarSpacer } from './ElectronTouchBarSpacer.d.ts';

/**
 * Electron TouchBar for building a macOS Touch Bar layout.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTouchBar {
  /** The item that replaces the "esc" button on the touch bar. Setting to `null` restores the default. */
  escapeItem: ElectronTouchBarButton | ElectronTouchBarColorPicker | ElectronTouchBarGroup | ElectronTouchBarLabel | ElectronTouchBarPopover | ElectronTouchBarScrubber | ElectronTouchBarSegmentedControl | ElectronTouchBarSlider | ElectronTouchBarSpacer | null;

  /** Reference to the {@link ElectronTouchBarButton} class. */
  static TouchBarButton: typeof ElectronTouchBarButton;

  /** Reference to the {@link ElectronTouchBarColorPicker} class. */
  static TouchBarColorPicker: typeof ElectronTouchBarColorPicker;

  /** Reference to the {@link ElectronTouchBarGroup} class. */
  static TouchBarGroup: typeof ElectronTouchBarGroup;

  /** Reference to the {@link ElectronTouchBarLabel} class. */
  static TouchBarLabel: typeof ElectronTouchBarLabel;

  /** Reference to the {@link ElectronTouchBarOtherItemsProxy} class. */
  static TouchBarOtherItemsProxy: typeof ElectronTouchBarOtherItemsProxy;

  /** Reference to the {@link ElectronTouchBarPopover} class. */
  static TouchBarPopover: typeof ElectronTouchBarPopover;

  /** Reference to the {@link ElectronTouchBarScrubber} class. */
  static TouchBarScrubber: typeof ElectronTouchBarScrubber;

  /** Reference to the {@link ElectronTouchBarSegmentedControl} class. */
  static TouchBarSegmentedControl: typeof ElectronTouchBarSegmentedControl;

  /** Reference to the {@link ElectronTouchBarSlider} class. */
  static TouchBarSlider: typeof ElectronTouchBarSlider;

  /** Reference to the {@link ElectronTouchBarSpacer} class. */
  static TouchBarSpacer: typeof ElectronTouchBarSpacer;

  /**
   * Create new instance of {@link ElectronTouchBar}.
   *
   * @param options - Options.
   */
  constructor(options: ElectronTouchBarConstructorOptions);
}
