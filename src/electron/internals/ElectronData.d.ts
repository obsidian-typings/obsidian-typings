import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Data to write to the clipboard.
 *
 * @public
 * @unofficial
 */
export interface ElectronData {
  /** The title of the URL at `text`. */
  bookmark?: string;

  /** The HTML markup content. */
  html?: string;

  /** The image content. */
  image?: ElectronNativeImage;

  /** The RTF content. */
  rtf?: string;

  /** The plain text content. */
  text?: string;
}
