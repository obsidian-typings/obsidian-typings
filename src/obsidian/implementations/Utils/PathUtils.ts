/**
 * Get the parent folder path of a given path.
 *
 * @param path - The path to get the parent folder path of.
 * @returns The parent folder path.
 * @public
 */
export function parentFolderPath(path: string): string {
    return path.replace(/\/?[^\/]*$/, '') || '/';
}
