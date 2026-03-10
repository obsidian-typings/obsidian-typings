import {
  TFile
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the TFile constructor.
 *
 * @returns The TFile constructor.
 *
 * @public
 * @unofficial
 */
export function getTFileConstructor(): ExtractConstructor<TFile> {
  return TFile as ExtractConstructor<TFile>;
}
