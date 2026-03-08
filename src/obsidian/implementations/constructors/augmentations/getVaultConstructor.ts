import {
    Vault
} from 'obsidian';
import type { VaultConstructor } from '../../../internals/constructors/augmentations/VaultConstructor.d.ts';

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
