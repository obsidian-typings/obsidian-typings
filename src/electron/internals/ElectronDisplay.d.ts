import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';

/**
 * Describes a display connected to the system.
 *
 * @public
 * @unofficial
 */
export interface ElectronDisplay {
  /** Whether the display supports accelerometer input. Can be `available`, `unavailable` or `unknown`. */
  accelerometerSupport: 'available' | 'unavailable' | 'unknown';

  /** The bounds of the display in DIP points. */
  bounds: ElectronRectangle;

  /** The number of bits per pixel. */
  colorDepth: number;

  /** Represents a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions. */
  colorSpace: string;

  /** The number of bits per color component. */
  depthPerComponent: number;

  /** The display refresh rate. */
  displayFrequency: number;

  /** Unique identifier associated with the display. */
  id: number;

  /** `true` for an internal display and `false` for an external display. */
  internal: boolean;

  /** Whether or not the display is a monochrome display. */
  monochrome: boolean;

  /** Screen rotation in clock-wise degrees. Can be `0`, `90`, `180` or `270`. */
  rotation: number;

  /** Output device's pixel scale factor. */
  scaleFactor: number;

  /** The size of the display. */
  size: ElectronSize;

  /** Whether the display supports touch input. Can be `available`, `unavailable` or `unknown`. */
  touchSupport: 'available' | 'unavailable' | 'unknown';

  /** The work area of the display in DIP points. */
  workArea: ElectronRectangle;

  /** The size of the work area of the display. */
  workAreaSize: ElectronSize;
}
