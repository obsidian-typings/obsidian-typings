import type { CapacitorGlobal } from '../../../@capacitor__core/internals/CapacitorGlobal.d.ts';

export {};

declare global {
  /**
   * Registry of available Capacitor platform implementations.
   *
   * @unofficial
   */
  var Capacitor: CapacitorGlobal;
}
