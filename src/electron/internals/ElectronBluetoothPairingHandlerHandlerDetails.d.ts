import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details passed to the {@link Session.setBluetoothPairingHandler} handler describing a Bluetooth pairing
 * request.
 *
 * @public
 * @unofficial
 */
export interface ElectronBluetoothPairingHandlerHandlerDetails {
  /** The identifier of the device requesting pairing. */
  deviceId: string;

  /** The frame that initiated the pairing request. */
  frame: ElectronWebFrameMain;

  /** The type of pairing prompt being requested. */
  pairingKind: 'confirm' | 'confirmPin' | 'providePin';

  /** The pin value to verify when `pairingKind` is `confirmPin`. */
  pin?: string;
}
