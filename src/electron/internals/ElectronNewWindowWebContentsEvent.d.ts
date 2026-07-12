import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';

/**
 * The event emitted for the deprecated `new-window` event.
 *
 * @public
 * @unofficial
 */
export interface ElectronNewWindowWebContentsEvent extends ElectronEvent {
  /** The new window instance that must be set when the default window creation is prevented. */
  newGuest?: ElectronBrowserWindow;
}
