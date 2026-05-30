import { ConfirmationButton } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ConfirmationButton constructor.
 *
 * @returns The ConfirmationButton constructor.
 *
 * @public
 * @unofficial
 */
export function getConfirmationButtonConstructor(): ExtractConstructor<ConfirmationButton> {
  return ConfirmationButton as ExtractConstructor<ConfirmationButton>;
}
