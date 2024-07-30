import {
    TFolder,
    type Vault
} from "obsidian";

type TFolderConstructor = { new(vault: Vault, path: string): TFolder };

export function createTFolder(vault: Vault, path: string) {
    let folder = vault.getFolderByPath(path);
    if (folder) {
        return folder;
    }

    folder = new (TFolder as TFolderConstructor)(vault, path);
    folder.parent = createTFolder(vault, vault.adapter.path.dirname(path));
    return folder;
}
