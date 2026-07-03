import { CapacitorAdapter } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#CapacitorAdapter} constructor.
 *
 * @returns The {@link obsidian#CapacitorAdapter} constructor.
 *
 * @public
 * @unofficial
 */
export function getCapacitorAdapterConstructor(): ExtractConstructor<CapacitorAdapter> {
  return CapacitorAdapter as ExtractConstructor<CapacitorAdapter>;
}
