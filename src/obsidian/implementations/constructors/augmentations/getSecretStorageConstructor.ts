import {
    SecretStorage
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SecretStorage constructor.
 *
 * @returns The SecretStorage constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretStorageConstructor(): ExtractConstructor<SecretStorage> {
    return SecretStorage as ExtractConstructor<SecretStorage>;
}
