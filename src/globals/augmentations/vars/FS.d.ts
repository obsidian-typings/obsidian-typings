import type { CapacitorAdapterFs } from '../../../obsidian/internals/CapacitorAdapterFs.d.ts';
import type { ExtractConstructor } from '../../../obsidian/internals/constructors/ExtractConstructor.d.ts';

export {};

declare global {
  /**
   * Constructor for the Capacitor file system adapter.
   *
   * @unofficial
   */
  var FS: ExtractConstructor<CapacitorAdapterFs>;
}
