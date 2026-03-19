import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { FrameDom } from '../../../internals/FrameDom.d.ts';

/**
 * Get the FrameDom constructor.
 *
 * @returns The FrameDom constructor.
 *
 * @public
 * @unofficial
 */
export function getFrameDomConstructor(): ExtractConstructor<FrameDom> {
  return window.frameDom.constructor as ExtractConstructor<FrameDom>;
}
