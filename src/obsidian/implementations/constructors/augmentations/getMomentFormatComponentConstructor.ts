import {
    MomentFormatComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MomentFormatComponentConstructor = ExtractConstructor<MomentFormatComponent>;

/**
 * Get the MomentFormatComponent constructor.
 *
 * @returns The MomentFormatComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getMomentFormatComponentConstructor(): MomentFormatComponentConstructor {
    return MomentFormatComponent as MomentFormatComponentConstructor;
}
