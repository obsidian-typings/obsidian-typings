export {};

import type { Capacitor as CapacitorInstance } from '@capacitor/core';

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   * @unofficial
   */
  const Capacitor: typeof CapacitorInstance;
}
