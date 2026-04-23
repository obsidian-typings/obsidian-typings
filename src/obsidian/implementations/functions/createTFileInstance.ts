import type {
  App,
  TFile
} from 'obsidian';

import { getTFileConstructor } from '../constructors/augmentations/getTFileConstructor.ts';
import { parentFolderPath } from '../utils/PathUtils.ts';
import { createTFolderInstance } from './createTFolderInstance.ts';

/**
 * Creates and properly initializes the instance of `TFile` even the underlying file does not exist.
 * This doesn't create the missing file on the file system.
 *
 * @param app - The Obsidian app instance.
 * @param path - The path to the file.
 * @returns The created `TFile` instance.
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
