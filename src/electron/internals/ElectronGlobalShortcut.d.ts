import type { ElectronAccelerator } from './ElectronAccelerator.d.ts';

/**
 * Detects keyboard events when the application does not have keyboard focus.
 *
 * @public
 * @unofficial
 */
export interface ElectronGlobalShortcut {
  /**
   * Returns whether this application has registered `accelerator`.
   *
   * When the accelerator is already taken by other applications, this call will still return `false`. This behavior is
   * intended by operating systems, since they don't want applications to fight for global shortcuts.
   *
   * @param accelerator - The accelerator to check.
   * @returns Whether this application has registered `accelerator`.
   */
  isRegistered(accelerator: ElectronAccelerator): boolean;

  /**
   * Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by
   * the user.
   *
   * When the accelerator is already taken by other applications, this call will silently fail.
   *
   * @param accelerator - The accelerator to register.
   * @param callback - Called when the registered shortcut is pressed.
   * @returns Whether or not the shortcut was registered successfully.
   */
  register(accelerator: ElectronAccelerator, callback: () => void): boolean;

  /**
   * Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the
   * registered shortcuts are pressed by the user.
   *
   * When a given accelerator is already taken by other applications, this call will silently fail.
   *
   * @param accelerators - The accelerators to register.
   * @param callback - Called when any of the registered shortcuts is pressed.
   */
  registerAll(accelerators: string[], callback: () => void): void;

  /**
   * Unregisters the global shortcut of `accelerator`.
   *
   * @param accelerator - The accelerator to unregister.
   */
  unregister(accelerator: ElectronAccelerator): void;

  /** Unregisters all of the global shortcuts. */
  unregisterAll(): void;
}
