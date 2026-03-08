import {
    FileValue
} from 'obsidian';
import type { FileValueConstructor } from '../../../internals/constructors/augmentations/FileValueConstructor.d.ts';

/**
 * Get the FileValue constructor.
 *
 * @returns The FileValue constructor.
 *
 * @public
 * @unofficial
 */
export function getFileValueConstructor(): FileValueConstructor {
    return FileValue as FileValueConstructor;
}
