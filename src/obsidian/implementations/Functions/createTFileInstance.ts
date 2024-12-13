import {
    TFile,
    type Vault
} from 'obsidian';
import { constructTFile } from '../Constructors/constructTFile.ts';
import { createTFolderInstance } from './createTFolderInstance.ts';
import { parentFolderPath } from '../Utils/PathUtils.js';

/**
 * Creates and properly initializes the instance of TFile even the underlying file does not exist.
 * This doesn't create the missing file on the file system.
 */
export function createTFileInstance(vault: Vault, path: string): TFile {
    let file = vault.getFileByPath(path);
    if (file) {
        return file;
    }

    file = constructTFile(vault, path);
    file.parent = createTFolderInstance(vault, parentFolderPath(path));
    file.deleted = true;
    return file;
}
