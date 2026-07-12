/**
 * CPU usage statistics for a process.
 *
 * @public
 * @unofficial
 */
export interface ElectronCPUUsage {
  /**
   * The number of average idle CPU wakeups per second since the last call to `getCPUUsage`. First
   * call returns `0`. Always returns `0` on Windows.
   */
  idleWakeupsPerSecond: number;

  /** Percentage of CPU used since the last call to `getCPUUsage`. First call returns `0`. */
  percentCPUUsage: number;
}
