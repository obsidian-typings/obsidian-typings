import {
  ExtraButtonComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ExtraButtonComponentConstructor = ExtractConstructor<ExtraButtonComponent>;

/**
 * Get the ExtraButtonComponent constructor.
 *
 * @returns The ExtraButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getExtraButtonComponentConstructor(): ExtraButtonComponentConstructor {
  return ExtraButtonComponent as ExtraButtonComponentConstructor;
}
