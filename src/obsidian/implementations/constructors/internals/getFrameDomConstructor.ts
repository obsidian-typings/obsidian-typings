import type { FrameDomConstructor } from '../../../internals/constructors/internals/FrameDomConstructor.d.ts';

/**
 * Get the FrameDom constructor.
 *
 * @returns The FrameDom constructor.
 *
 * @public
 * @unofficial
 */
export function getFrameDomConstructor(): FrameDomConstructor {
    return window.frameDom.constructor as FrameDomConstructor;
}
