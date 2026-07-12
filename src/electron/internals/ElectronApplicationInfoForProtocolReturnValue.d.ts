import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Information about the application handling a given protocol.
 *
 * @public
 * @unofficial
 */
export interface ElectronApplicationInfoForProtocolReturnValue {
  /** The display icon of the app handling the protocol. */
  icon: ElectronNativeImage;

  /** Display name of the app handling the protocol. */
  name: string;

  /** Installation path of the app handling the protocol. */
  path: string;
}
