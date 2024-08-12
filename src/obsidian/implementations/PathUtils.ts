export function dirname(path: string): string {
    return path.replace(/\/?[^\/]*$/, "");
}
