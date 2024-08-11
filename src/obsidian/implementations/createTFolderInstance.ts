import {
    TFolder,
    type Vault
} from "obsidian";

type TFolderConstructor = { new(vault: Vault, path: string): TFolder };

/**
 * Creates and properly initializes the instance of TFolder even the underlying folder does not exist.
 * This doesn't create the missing folder on the file system.
 */
export function createTFolderInstance(vault: Vault, path: string): TFolder {
    let folder = vault.getFolderByPath(path);
    if (folder) {
        return folder;
    }

    folder = new (TFolder as TFolderConstructor)(vault, path);
    folder.parent = createTFolderInstance(vault, vault.adapter.path.dirname(path));
    folder.deleted = true;
    return folder;
}
