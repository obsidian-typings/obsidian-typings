import {
  Vault
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type VaultConstructor = ExtractConstructor<Vault>;

/**
 * Get the Vault constructor.
 *
 * @returns The Vault constructor.
 *
 * @public
 * @unofficial
 */
export function getVaultConstructor(): VaultConstructor {
  return Vault as VaultConstructor;
}
