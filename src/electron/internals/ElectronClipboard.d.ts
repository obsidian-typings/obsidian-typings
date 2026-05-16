import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Electron Clipboard for reading and writing system clipboard data.
 *
 * @public
 * @unofficial
 */
export interface ElectronClipboard {
  /**
   * Returns the available clipboard formats.
   *
   * @param type - The clipboard type.
   * @returns An array of format strings.
   */
  availableFormats(type?: 'clipboard' | 'selection'): string[];

  /**
   * Clears the clipboard content.
   *
   * @param type - The clipboard type.
   */
  clear(type?: 'clipboard' | 'selection'): void;

  /**
   * Returns whether the clipboard has the specified format.
   *
   * @param format - The format to check.
   * @param type - The clipboard type.
   * @returns Whether the format is available.
   */
  has(format: string, type?: 'clipboard' | 'selection'): boolean;

  /**
   * Reads the clipboard content for the specified format.
   *
   * @param format - The format to read.
   * @returns The clipboard content.
   */
  read(format: string): string;

  /**
   * Reads the bookmark from the clipboard.
   *
   * @returns The bookmark title and URL.
   */
  readBookmark(): { title: string; url: string };

  /**
   * Reads the clipboard content as a buffer.
   *
   * @param format - The format to read.
   * @returns The clipboard buffer.
   */
  readBuffer(format: string): Buffer;

  /**
   * Reads the clipboard content as HTML.
   *
   * @param type - The clipboard type.
   * @returns The HTML content.
   */
  readHTML(type?: 'clipboard' | 'selection'): string;

  /**
   * Reads the clipboard content as a ElectronNativeImage.
   *
   * @param type - The clipboard type.
   * @returns The clipboard image.
   */
  readImage(type?: 'clipboard' | 'selection'): ElectronNativeImage;

  /**
   * Reads the clipboard content as plain text.
   *
   * @param type - The clipboard type.
   * @returns The text content.
   */
  readText(type?: 'clipboard' | 'selection'): string;

  /**
   * Writes a bookmark to the clipboard.
   *
   * @param title - The bookmark title.
   * @param url - The bookmark URL.
   * @param type - The clipboard type.
   */
  writeBookmark(title: string, url: string, type?: 'clipboard' | 'selection'): void;

  /**
   * Writes HTML content to the clipboard.
   *
   * @param markup - The HTML content.
   * @param type - The clipboard type.
   */
  writeHTML(markup: string, type?: 'clipboard' | 'selection'): void;

  /**
   * Writes a ElectronNativeImage to the clipboard.
   *
   * @param image - The image to write.
   * @param type - The clipboard type.
   */
  writeImage(image: ElectronNativeImage, type?: 'clipboard' | 'selection'): void;

  /**
   * Writes text to the clipboard.
   *
   * @param text - The text to write.
   * @param type - The clipboard type.
   */
  writeText(text: string, type?: 'clipboard' | 'selection'): void;
}
