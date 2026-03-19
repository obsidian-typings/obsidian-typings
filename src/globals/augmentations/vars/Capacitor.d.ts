import type { Capacitor as CapacitorInstance } from '@capacitor/core';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   * @unofficial
   */
  var Capacitor: typeof CapacitorInstance;
}
