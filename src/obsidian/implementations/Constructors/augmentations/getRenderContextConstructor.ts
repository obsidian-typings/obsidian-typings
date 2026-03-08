import {
    RenderContext
} from 'obsidian';
import type { RenderContextConstructor } from '../../../internals/Constructors/augmentations/RenderContextConstructor.ts';

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
