import type { Environment } from './Environment.d.ts';
import type { HookCallback } from './HookCallback.d.ts';
import type { HookTypes } from './HookTypes.d.ts';

/**
 * Prism hook system for extending highlighting behavior.
 *
 * @public
 * @unofficial
 */
export interface PrismHooks {
  /** All registered hooks. */
  all: HookTypes;

  /**
   * Registers a callback for a hook.
   *
   * @param name - The hook name.
   * @param callback - The callback to register.
   */
  add(name: string, callback: HookCallback): void;

  /**
   * Runs all callbacks registered for a hook.
   *
   * @param name - The hook name.
   * @param env - The environment object.
   */
  run(name: string, env: Environment): void;
}
