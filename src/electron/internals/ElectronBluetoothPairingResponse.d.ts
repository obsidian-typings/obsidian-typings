/**
 * Response returned to the {@link Session.setBluetoothPairingHandler} callback to resolve a Bluetooth
 * pairing request.
 *
 * @public
 * @unofficial
 */
export interface ElectronBluetoothPairingResponse {
  /**
   * Whether the pairing is confirmed. Pass `false` when the dialog is canceled; when `pairingKind` is
   * `providePin`, pass `true` when a value is provided.
   */
  confirmed: boolean;

  /** When `pairingKind` is `providePin`, the required pin for the Bluetooth device. */
  pin?: null | string;
}
