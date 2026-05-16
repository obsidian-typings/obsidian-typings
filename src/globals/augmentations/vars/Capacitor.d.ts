import type { Capacitor as CapacitorInstance } from '../../../@capacitor__core/internals/vars/Capacitor.d.ts';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   *
   * @unofficial
   */
  var Capacitor: typeof CapacitorInstance;
}
