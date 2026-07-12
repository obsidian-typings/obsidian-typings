import type { ElectronHIDDevice } from './ElectronHIDDevice.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to the `select-hid-device` session event.
 *
 * @public
 * @unofficial
 */
export interface ElectronSelectHidDeviceDetails {
  /** The list of HID devices available for selection. */
  deviceList: ElectronHIDDevice[];

  /** The frame that requested a device. */
  frame: ElectronWebFrameMain;
}
