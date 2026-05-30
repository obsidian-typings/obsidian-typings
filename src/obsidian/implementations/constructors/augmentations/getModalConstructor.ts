import { Modal } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Modal} constructor.
 *
 * @returns The {@link obsidian#Modal} constructor.
 *
 * @public
 * @unofficial
 */
export function getModalConstructor(): ExtractConstructor<Modal> {
  return Modal as ExtractConstructor<Modal>;
}
