import {
    SecretStorage
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SecretStorageConstructor = ExtractConstructor<SecretStorage>;

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
