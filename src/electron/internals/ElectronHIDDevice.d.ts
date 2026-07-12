/**
 * A HID device available for selection via the Web HID API.
 *
 * @public
 * @unofficial
 */
export interface ElectronHIDDevice {
  /** Unique identifier for the device. */
  deviceId: string;

  /** Unique identifier for the HID interface. A device may have multiple HID interfaces. */
  guid?: string;

  /** Name of the device. */
  name: string;

  /** The USB product ID. */
  productId: number;

  /** The USB device serial number. */
  serialNumber?: string;

  /** The USB vendor ID. */
  vendorId: number;
}
