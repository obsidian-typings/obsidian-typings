import {
    SecretComponent
} from 'obsidian';
import type { SecretComponentConstructor } from '../../../internals/constructors/augmentations/SecretComponentConstructor.ts';

/**
 * Get the SecretComponent constructor.
 *
 * @returns The SecretComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSecretComponentConstructor(): SecretComponentConstructor {
    return SecretComponent as SecretComponentConstructor;
}
