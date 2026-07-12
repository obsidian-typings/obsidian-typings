import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Parameters for device emulation.
 *
 * @public
 * @unofficial
 */
export interface ElectronParameters {
  /**
   * The device scale factor. If zero, defaults to the original device scale factor.
   *
   * @default `0`
   */
  deviceScaleFactor: number;

  /**
   * Scale of the emulated view inside the available space (not in fit-to-view mode).
   *
   * @default `1`
   */
  scale: number;

  /** The screen type to emulate. */
  screenPosition: 'desktop' | 'mobile';

  /** The emulated screen size, used when `screenPosition` is `mobile`. */
  screenSize: ElectronSize;

  /** The position of the view on the screen, used when `screenPosition` is `mobile`. */
  viewPosition: ElectronPoint;

  /** The emulated view size. An empty value means no override. */
  viewSize: ElectronSize;
}
