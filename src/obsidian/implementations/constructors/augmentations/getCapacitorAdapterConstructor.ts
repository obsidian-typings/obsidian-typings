import {
  CapacitorAdapter
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type CapacitorAdapterConstructor = ExtractConstructor<CapacitorAdapter>;

/**
 * Get the CapacitorAdapter constructor.
 *
 * @returns The CapacitorAdapter constructor.
 *
 * @public
 * @unofficial
 */
export function getCapacitorAdapterConstructor(): CapacitorAdapterConstructor {
  return CapacitorAdapter as CapacitorAdapterConstructor;
}
