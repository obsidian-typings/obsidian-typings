import { ConfirmationModal } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ConfirmationModal constructor.
 *
 * @returns The ConfirmationModal constructor.
 *
 * @public
 * @unofficial
 */
export function getConfirmationModalConstructor(): ExtractConstructor<ConfirmationModal> {
  return ConfirmationModal as ExtractConstructor<ConfirmationModal>;
}
