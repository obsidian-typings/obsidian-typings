import {
    TFile
} from 'obsidian';
import type { TFileConstructor } from '../../../internals/Constructors/augmentations/TFileConstructor.ts';

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
