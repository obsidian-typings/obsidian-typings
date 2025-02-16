import {
    type App,
    TFolder
} from 'obsidian';
import { getTFolderConstructor } from '../Constructors/getTFolderConstructor.ts';
import { parentFolderPath } from '../Utils/PathUtils.ts';

/**
 * Creates and properly initializes the instance of TFolder even the underlying folder does not exist.
 * This doesn't create the missing folder on the file system.
 * @public
 */
export function createTFolderInstance(app: App, path: string): TFolder {
    let folder = app.vault.getFolderByPath(path);
    if (folder) {
        return folder;
    }

    folder = new (getTFolderConstructor())(app.vault, path);
    folder.parent = createTFolderInstance(app, parentFolderPath(path));
    folder.deleted = true;
    return folder;
}
