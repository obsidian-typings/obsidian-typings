import {
    Setting
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SettingConstructor = ExtractConstructor<Setting>;

/**
 * Get the Setting constructor.
 *
 * @returns The Setting constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingConstructor(): SettingConstructor {
    return Setting as SettingConstructor;
}
