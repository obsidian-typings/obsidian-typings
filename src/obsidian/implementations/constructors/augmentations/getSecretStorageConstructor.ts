import {
    SecretStorage
} from 'obsidian';
import type { SecretStorageConstructor } from '../../../internals/constructors/augmentations/SecretStorageConstructor.d.ts';

/**
 * Get the SecretStorage constructor.
 *
 * @returns The SecretStorage constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretStorageConstructor(): SecretStorageConstructor {
    return SecretStorage as SecretStorageConstructor;
}
