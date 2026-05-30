import { SecretComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SecretComponent} constructor.
 *
 * @returns The {@link obsidian#SecretComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretComponentConstructor(): ExtractConstructor<SecretComponent> {
  return SecretComponent as ExtractConstructor<SecretComponent>;
}
