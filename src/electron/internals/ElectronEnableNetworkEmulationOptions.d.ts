/**
 * Options for emulating network conditions for a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronEnableNetworkEmulationOptions {
  /** Download rate in Bps. `0` disables download throttling. */
  downloadThroughput?: number;

  /** RTT in ms. `0` disables latency throttling. */
  latency?: number;

  /** Whether to emulate network outage. */
  offline?: boolean;

  /** Upload rate in Bps. `0` disables upload throttling. */
  uploadThroughput?: number;
}
