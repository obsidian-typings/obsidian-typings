import type { ElectronHIDDevice } from './ElectronHIDDevice.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to the `hid-device-removed` session event.
 *
 * @public
 * @unofficial
 */
export interface ElectronHidDeviceRemovedDetails {
  /** The HID devices that were removed. */
  device: ElectronHIDDevice[];

  /** The frame associated with the removed device. */
  frame: ElectronWebFrameMain;
}
