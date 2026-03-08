import {
    SecretStorage
} from 'obsidian';
import type { SecretStorageConstructor } from '../../../internals/constructors/augmentations/SecretStorageConstructor.ts';

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
