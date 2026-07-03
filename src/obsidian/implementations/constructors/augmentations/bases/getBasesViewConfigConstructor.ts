import { BasesViewConfig } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BasesViewConfig} constructor.
 *
 * @returns The {@link obsidian#BasesViewConfig} constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesViewConfigConstructor(): ExtractConstructor<BasesViewConfig> {
  return BasesViewConfig as ExtractConstructor<BasesViewConfig>;
}
