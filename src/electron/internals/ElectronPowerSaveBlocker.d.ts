/**
 * Electron `powerSaveBlocker` module for blocking the system from entering low-power (sleep) mode.
 *
 * @public
 * @unofficial
 */
export interface ElectronPowerSaveBlocker {
  /**
   * Whether the corresponding `powerSaveBlocker` has started.
   *
   * @param id - The power save blocker id returned by `start`.
   * @returns `true` if the power save blocker with the given `id` is currently active.
   */
  isStarted(id: number): boolean;

  /**
   * Starts preventing the system from entering lower-power mode. Returns an integer identifying the
   * power save blocker.
   *
   * `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest
   * precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence
   * over `prevent-app-suspension`.
   *
   * @param type - The kind of power save blocker to start.
   * @returns The blocker id assigned to this power save blocker.
   */
  start(type: 'prevent-app-suspension' | 'prevent-display-sleep'): number;

  /**
   * Stops the specified power save blocker.
   *
   * @param id - The power save blocker id returned by `start`.
   */
  stop(id: number): void;
}
