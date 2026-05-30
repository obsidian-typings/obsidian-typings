import { Component } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Component} constructor.
 *
 * @returns The {@link obsidian#Component} constructor.
 *
 * @public
 * @unofficial
 */
export function getComponentConstructor(): ExtractConstructor<Component> {
  return Component as ExtractConstructor<Component>;
}
