import type { ElectronHIDDevice } from './ElectronHIDDevice.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to the `hid-device-added` session event.
 *
 * @public
 * @unofficial
 */
export interface ElectronHidDeviceAddedDetails {
  /** The HID devices that became available. */
  device: ElectronHIDDevice[];

  /** The frame that requested the device. */
  frame: ElectronWebFrameMain;
}
