import {
    RenderContext
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type RenderContextConstructor = ExtractConstructor<RenderContext>;

/**
 * Get the RenderContext constructor.
 *
 * @returns The RenderContext constructor.
 *
 * @public
 * @unofficial
 */
export function getRenderContextConstructor(): RenderContextConstructor {
    return RenderContext as RenderContextConstructor;
}
