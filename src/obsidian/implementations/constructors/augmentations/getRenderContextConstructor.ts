import { RenderContext } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#RenderContext} constructor.
 *
 * @returns The {@link obsidian#RenderContext} constructor.
 *
 * @public
 * @unofficial
 */
export function getRenderContextConstructor(): ExtractConstructor<RenderContext> {
  return RenderContext as ExtractConstructor<RenderContext>;
}
