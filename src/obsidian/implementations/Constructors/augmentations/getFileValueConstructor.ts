import {
    FileValue
} from 'obsidian';
import type { FileValueConstructor } from '../../../internals/Constructors/augmentations/FileValueConstructor.ts';

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
