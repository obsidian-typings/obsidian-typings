import type { Scope } from 'obsidian';

/**
 * A registered keyboard shortcut interceptor within a scope.
 *
 * @public
 * @unofficial
 */
export interface KeyScope {
  /**
   * Key to match.
   */
  key: null | string;

  /**
   * Modifiers to match.
   */
  modifiers: null | string;

  /**
   * Scope where the key interceptor is registered.
   */
  scope: Scope;

  /**
   * Callback of function to execute when key is pressed.
   */
  func(): void;
}
