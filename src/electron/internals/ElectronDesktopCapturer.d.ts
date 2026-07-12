import type { ElectronDesktopCapturerSource } from './ElectronDesktopCapturerSource.d.ts';
import type { ElectronSourcesOptions } from './ElectronSourcesOptions.d.ts';

/**
 * Electron desktop capturer for accessing information about media sources that can be used to capture audio
 * and video from the desktop using the `navigator.mediaDevices.getUserMedia` API.
 *
 * @public
 * @unofficial
 */
export interface ElectronDesktopCapturer {
  /**
   * Resolves with an array of `DesktopCapturerSource` objects, each representing a screen or an individual
   * window that can be captured.
   *
   * Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can be
   * detected via `systemPreferences.getMediaAccessStatus`.
   *
   * @param options - Options describing which sources to capture.
   * @returns A promise resolving with the captured sources.
   */
  getSources(options: ElectronSourcesOptions): Promise<ElectronDesktopCapturerSource[]>;
}
