import { BasesViewConfig } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the BasesViewConfig constructor.
 *
 * @returns The BasesViewConfig constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesViewConfigConstructor(): ExtractConstructor<BasesViewConfig> {
  return BasesViewConfig as ExtractConstructor<BasesViewConfig>;
}
