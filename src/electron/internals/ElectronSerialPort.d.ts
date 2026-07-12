/**
 * A serial port available for selection via the Web Serial API.
 *
 * @public
 * @unofficial
 */
export interface ElectronSerialPort {
  /** A stable identifier on Windows that can be used for device permissions. */
  deviceInstanceId?: string;

  /** A string suitable for display to the user for describing this device. */
  displayName: string;

  /** Unique identifier for the port. */
  portId: string;

  /** Name of the port. */
  portName: string;

  /** Optional USB product ID. */
  productId: string;

  /** The USB device serial number. */
  serialNumber: string;

  /** Represents a single serial port on macOS that can be enumerated by multiple drivers. */
  usbDriverName?: string;

  /** Optional USB vendor ID. */
  vendorId: string;
}
