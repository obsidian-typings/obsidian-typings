import {
    TFolder,
    type Vault
} from 'obsidian';
import { constructTFolder } from '../Constructors/constructTFolder.ts';
import { parentFolderPath } from '../Utils/PathUtils.js';

/**
 * Creates and properly initializes the instance of TFolder even the underlying folder does not exist.
 * This doesn't create the missing folder on the file system.
 */
export function createTFolderInstance(vault: Vault, path: string): TFolder {
    let folder = vault.getFolderByPath(path);
    if (folder) {
        return folder;
    }

    folder = constructTFolder(vault, path);
    folder.parent = createTFolderInstance(vault, parentFolderPath(path));
    folder.deleted = true;
    return folder;
}
