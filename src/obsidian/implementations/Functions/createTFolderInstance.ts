import {
    TFolder,
    type Vault
} from 'obsidian';
import { getTFolderConstructor } from '../Constructors/getTFolderConstructor.ts';
import { parentFolderPath } from '../Utils/PathUtils.js';

/**
 * Creates and properly initializes the instance of TFolder even the underlying folder does not exist.
 * This doesn't create the missing folder on the file system.
 * @public
 */
export function createTFolderInstance(vault: Vault, path: string): TFolder {
    let folder = vault.getFolderByPath(path);
    if (folder) {
        return folder;
    }

    folder = new (getTFolderConstructor())(vault, path);
    folder.parent = createTFolderInstance(vault, parentFolderPath(path));
    folder.deleted = true;
    return folder;
}
