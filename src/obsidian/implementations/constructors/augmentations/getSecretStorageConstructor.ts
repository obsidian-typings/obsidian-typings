import { SecretStorage } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SecretStorage} constructor.
 *
 * @returns The {@link obsidian#SecretStorage} constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretStorageConstructor(): ExtractConstructor<SecretStorage> {
  return SecretStorage as ExtractConstructor<SecretStorage>;
}
