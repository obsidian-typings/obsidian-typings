import {
    Setting
} from 'obsidian';
import type { SettingConstructor } from '../../../internals/Constructors/augmentations/SettingConstructor.ts';

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
