import { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#App} constructor.
 *
 * @returns The {@link obsidian#App} constructor.
 *
 * @public
 * @unofficial
 */
export function getAppConstructor(): ExtractConstructor<App> {
  return App as ExtractConstructor<App>;
}
