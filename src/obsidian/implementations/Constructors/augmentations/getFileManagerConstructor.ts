import {
    FileManager
} from 'obsidian';
import type { FileManagerConstructor } from '../../../internals/Constructors/augmentations/FileManagerConstructor.ts';

/**
 * Get the FileManager constructor.
 *
 * @returns The FileManager constructor.
 *
 * @public
 * @unofficial
 */
export function getFileManagerConstructor(): FileManagerConstructor {
    return FileManager as FileManagerConstructor;
}
