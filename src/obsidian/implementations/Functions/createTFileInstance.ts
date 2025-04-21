import {
    type App,
    TFile
} from 'obsidian';
import { getTFileConstructor } from '../Constructors/getTFileConstructor.ts';
import { parentFolderPath } from '../Utils/PathUtils.ts';
import { createTFolderInstance } from './createTFolderInstance.ts';

/**
 * Creates and properly initializes the instance of TFile even the underlying file does not exist.
 * This doesn't create the missing file on the file system.
 *
 * @public
 * @unofficial
 */
export function createTFileInstance(app: App, path: string): TFile {
    let file = app.vault.getFileByPath(path);
    if (file) {
        return file;
    }

    file = new (getTFileConstructor())(app.vault, path);
    file.parent = createTFolderInstance(app, parentFolderPath(path));
    file.deleted = true;
    return file;
}
