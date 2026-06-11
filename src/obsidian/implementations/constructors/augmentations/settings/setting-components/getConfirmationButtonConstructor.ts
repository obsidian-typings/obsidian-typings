import { ConfirmationButton } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ConfirmationButton} constructor.
 *
 * @returns The {@link obsidian#ConfirmationButton} constructor.
 *
 * @public
 * @unofficial
 */
export function getConfirmationButtonConstructor(): ExtractConstructor<ConfirmationButton> {
  return ConfirmationButton as unknown as ExtractConstructor<ConfirmationButton>;
}
