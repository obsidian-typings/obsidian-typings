import {
    cp,
    mkdir,
    readdir
} from 'node:fs/promises';
import {
    dirname,
    join
} from 'node:path/posix';

for (const dirent of await readdir('static', { withFileTypes: true, recursive: true })) {
    if (!dirent.isFile()) {
        continue;
    }

    const sourcePath = join(dirent.parentPath.replace(/\\/g, '/'), dirent.name);
    const targetPath = sourcePath.replace(/^static/, 'dist');
    await mkdir(dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath);
}
