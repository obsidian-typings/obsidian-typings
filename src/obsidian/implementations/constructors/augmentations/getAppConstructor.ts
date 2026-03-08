import {
    App
} from 'obsidian';
import type { AppConstructor } from '../../../internals/constructors/augmentations/AppConstructor.ts';

/**
 * Get the App constructor.
 *
 * @returns The App constructor.
 *
 * @public
 * @unofficial
 */
export function getAppConstructor(): AppConstructor {
    return App as AppConstructor;
}
