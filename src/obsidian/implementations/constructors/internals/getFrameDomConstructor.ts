import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { FrameDom } from '../../../internals/FrameDom.d.ts';

type FrameDomConstructor = ExtractConstructor<FrameDom>;

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
