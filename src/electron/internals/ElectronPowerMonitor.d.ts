import type { ElectronEvent } from './ElectronEvent.d.ts';

/**
 * Electron `powerMonitor` module for monitoring power state changes.
 *
 * @public
 * @unofficial
 */
export interface ElectronPowerMonitor extends NodeJS.EventEmitter {
  /**
   * `true` if the system is on battery power.
   *
   * @see `isOnBatteryPower`.
   */
  onBatteryPower: boolean;

  /**
   * Emitted when the system is about to lock the screen.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  addListener(event: 'lock-screen', listener: () => void): this;
  /**
   * Emitted when the system changes to AC power.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  addListener(event: 'on-ac', listener: () => void): this;
  /**
   * Emitted when the system changes to battery power.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  addListener(event: 'on-battery', listener: () => void): this;
  /**
   * Emitted when the system is resuming.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  addListener(event: 'resume', listener: () => void): this;
  /**
   * Emitted when the system is about to reboot or shut down. If the event handler invokes
   * `event.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to
   * exit cleanly.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `linux,darwin`.
   */
  addListener(event: 'shutdown', listener: (event: ElectronEvent) => void): this;
  /**
   * Emitted when the system is suspending.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  addListener(event: 'suspend', listener: () => void): this;
  /**
   * Emitted as soon as the system's screen is unlocked.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  addListener(event: 'unlock-screen', listener: () => void): this;
  /**
   * Emitted when a login session is activated.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  addListener(event: 'user-did-become-active', listener: () => void): this;
  /**
   * Emitted when a login session is deactivated.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  addListener(event: 'user-did-resign-active', listener: () => void): this;

  /**
   * Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before
   * considered idle. `locked` is available on supported systems only.
   *
   * @param idleThreshold - The amount of time (in seconds) before the system is considered idle.
   * @returns The system's current state.
   */
  getSystemIdleState(idleThreshold: number): 'active' | 'idle' | 'locked' | 'unknown';

  /**
   * Calculate system idle time in seconds.
   *
   * @returns Idle time in seconds.
   */
  getSystemIdleTime(): number;

  /**
   * Whether the system is on battery power.
   *
   * To monitor for changes in this property, use the `on-battery` and `on-ac` events.
   *
   * @returns `true` if the system is on battery power.
   */
  isOnBatteryPower(): boolean;

  /**
   * Emitted when the system is about to lock the screen.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  on(event: 'lock-screen', listener: () => void): this;
  /**
   * Emitted when the system changes to AC power.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  on(event: 'on-ac', listener: () => void): this;
  /**
   * Emitted when the system changes to battery power.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  on(event: 'on-battery', listener: () => void): this;
  /**
   * Emitted when the system is resuming.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  on(event: 'resume', listener: () => void): this;
  /**
   * Emitted when the system is about to reboot or shut down. If the event handler invokes
   * `event.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to
   * exit cleanly.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `linux,darwin`.
   */
  on(event: 'shutdown', listener: (event: ElectronEvent) => void): this;
  /**
   * Emitted when the system is suspending.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  on(event: 'suspend', listener: () => void): this;
  /**
   * Emitted as soon as the system's screen is unlocked.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  on(event: 'unlock-screen', listener: () => void): this;
  /**
   * Emitted when a login session is activated.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  on(event: 'user-did-become-active', listener: () => void): this;
  /**
   * Emitted when a login session is deactivated.
   *
   * @param event - The event name.
   * @param listener - Callback invoked when the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  on(event: 'user-did-resign-active', listener: () => void): this;

  /**
   * Adds a one-time listener for the `lock-screen` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  once(event: 'lock-screen', listener: () => void): this;
  /**
   * Adds a one-time listener for the `on-ac` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  once(event: 'on-ac', listener: () => void): this;
  /**
   * Adds a one-time listener for the `on-battery` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  once(event: 'on-battery', listener: () => void): this;
  /**
   * Adds a one-time listener for the `resume` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  once(event: 'resume', listener: () => void): this;
  /**
   * Adds a one-time listener for the `shutdown` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `linux,darwin`.
   */
  once(event: 'shutdown', listener: (event: ElectronEvent) => void): this;
  /**
   * Adds a one-time listener for the `suspend` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   */
  once(event: 'suspend', listener: () => void): this;
  /**
   * Adds a one-time listener for the `unlock-screen` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  once(event: 'unlock-screen', listener: () => void): this;
  /**
   * Adds a one-time listener for the `user-did-become-active` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  once(event: 'user-did-become-active', listener: () => void): this;
  /**
   * Adds a one-time listener for the `user-did-resign-active` event.
   *
   * @param event - The event name.
   * @param listener - Callback invoked the next time the event is emitted.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  once(event: 'user-did-resign-active', listener: () => void): this;

  /**
   * Removes the specified `listener` from the `lock-screen` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  removeListener(event: 'lock-screen', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `on-ac` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  removeListener(event: 'on-ac', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `on-battery` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  removeListener(event: 'on-battery', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `resume` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   */
  removeListener(event: 'resume', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `shutdown` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `linux,darwin`.
   */
  removeListener(event: 'shutdown', listener: (event: ElectronEvent) => void): this;
  /**
   * Removes the specified `listener` from the `suspend` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   */
  removeListener(event: 'suspend', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `unlock-screen` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin,win32`.
   */
  removeListener(event: 'unlock-screen', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `user-did-become-active` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  removeListener(event: 'user-did-become-active', listener: () => void): this;
  /**
   * Removes the specified `listener` from the `user-did-resign-active` event.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This `PowerMonitor` instance.
   * Platform: `darwin`.
   */
  removeListener(event: 'user-did-resign-active', listener: () => void): this;
}
