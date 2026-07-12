import type { ElectronMessagePortMain } from './ElectronMessagePortMain.d.ts';

/**
 * A main-process channel that owns a pair of connected {@link ElectronMessagePortMain} ports.
 *
 * @public
 * @unofficial
 */
export declare class ElectronMessageChannelMain {
  /** One of the two connected `MessagePortMain` ports of this channel. */
  port1: ElectronMessagePortMain;

  /** The other of the two connected `MessagePortMain` ports of this channel. */
  port2: ElectronMessagePortMain;

  /** Create a new instance of {@link ElectronMessageChannelMain}. */
  constructor();
}
