import {
    TFile
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TFileConstructor = ExtractConstructor<TFile>;

/**
 * Get the TFile constructor.
 *
 * @returns The TFile constructor.
 *
 * @public
 * @unofficial
 */
export function getTFileConstructor(): TFileConstructor {
    return TFile as TFileConstructor;
}
