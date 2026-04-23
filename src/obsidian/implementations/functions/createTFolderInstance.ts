import type {
  App,
  TFolder
} from 'obsidian';

import { getTFolderConstructor } from '../constructors/augmentations/getTFolderConstructor.ts';
import { parentFolderPath } from '../utils/PathUtils.ts';

/**
 * Creates and properly initializes the instance of {@link TFolder} even the underlying folder does not exist.
 * This doesn't create the missing folder on the file system.
 *
 * @param app - The Obsidian app instance.
 * @param path - The path to the folder.
 * @returns The created {@link TFolder} instance.
 *
 * @public
 * @unofficial
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
