import {
    SettingTab
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SettingTab constructor.
 *
 * @returns The SettingTab constructor.
 *
 * @public
 * @unofficial
 */
export function getSettingTabConstructor(): ExtractConstructor<SettingTab> {
    return SettingTab as unknown as ExtractConstructor<SettingTab>;
}
