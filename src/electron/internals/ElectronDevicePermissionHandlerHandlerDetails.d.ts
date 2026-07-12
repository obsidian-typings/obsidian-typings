import type { ElectronHIDDevice } from './ElectronHIDDevice.d.ts';
import type { ElectronSerialPort } from './ElectronSerialPort.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to a device permission handler.
 *
 * @public
 * @unofficial
 */
export interface ElectronDevicePermissionHandlerHandlerDetails {
  /** The device that permission is being requested for. */
  device: ElectronHIDDevice | ElectronSerialPort;

  /** The type of device that permission is being requested on. */
  deviceType: 'hid' | 'serial';

  /** The frame checking the device permission. */
  frame: ElectronWebFrameMain;

  /** The origin URL of the device permission check. */
  origin: string;
}
