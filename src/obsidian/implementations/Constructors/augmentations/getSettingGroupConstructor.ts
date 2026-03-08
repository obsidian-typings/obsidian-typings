import {
    SettingGroup
} from 'obsidian';
import type { SettingGroupConstructor } from '../../../internals/Constructors/augmentations/SettingGroupConstructor.ts';

/**
 * Get the SettingGroup constructor.
 *
 * @returns The SettingGroup constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingGroupConstructor(): SettingGroupConstructor {
    return SettingGroup as SettingGroupConstructor;
}
