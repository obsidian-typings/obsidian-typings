import {
  Vault
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Vault constructor.
 *
 * @returns The Vault constructor.
 *
 * @public
 * @unofficial
 */
export function getVaultConstructor(): ExtractConstructor<Vault> {
  return Vault as ExtractConstructor<Vault>;
}
