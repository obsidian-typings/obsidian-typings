import {
    TFile,
    type Vault
} from 'obsidian';
import { getTFileConstructor } from '../Constructors/getTFileConstructor.ts';
import { parentFolderPath } from '../Utils/PathUtils.js';
import { createTFolderInstance } from './createTFolderInstance.ts';

/**
 * Creates and properly initializes the instance of TFile even the underlying file does not exist.
 * This doesn't create the missing file on the file system.
 * @public
 */
export function createTFileInstance(vault: Vault, path: string): TFile {
    let file = vault.getFileByPath(path);
    if (file) {
        return file;
    }

    file = new (getTFileConstructor())(vault, path);
    file.parent = createTFolderInstance(vault, parentFolderPath(path));
    file.deleted = true;
    return file;
}
