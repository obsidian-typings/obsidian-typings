import {
  SecretComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SecretComponentConstructor = ExtractConstructor<SecretComponent>;

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
