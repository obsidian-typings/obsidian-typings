import {
  RenderContext
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the RenderContext constructor.
 *
 * @returns The RenderContext constructor.
 *
 * @public
 * @unofficial
 */
export function getRenderContextConstructor(): ExtractConstructor<RenderContext> {
  return RenderContext as ExtractConstructor<RenderContext>;
}
