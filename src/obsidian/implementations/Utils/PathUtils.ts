export function parentFolderPath(path: string): string {
    return path.replace(/\/?[^\/]*$/, '') || '/';
}
