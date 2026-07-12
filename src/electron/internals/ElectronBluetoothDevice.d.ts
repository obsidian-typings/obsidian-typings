/**
 * A Bluetooth device available for selection.
 *
 * @public
 * @unofficial
 */
export interface ElectronBluetoothDevice {
  /** The unique identifier of the device. */
  deviceId: string;

  /** The human-readable name of the device. */
  deviceName: string;
}
