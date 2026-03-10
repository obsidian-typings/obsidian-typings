import {
  SecretComponent
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SecretComponent constructor.
 *
 * @returns The SecretComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretComponentConstructor(): ExtractConstructor<SecretComponent> {
  return SecretComponent as ExtractConstructor<SecretComponent>;
}
