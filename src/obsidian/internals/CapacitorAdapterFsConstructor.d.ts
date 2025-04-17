import type { CapacitorAdapterFs } from './CapacitorAdapterFs.d.ts';

/**
 * @public
 */
export type CapacitorAdapterFsConstructor = new(dir: string) => CapacitorAdapterFs;
