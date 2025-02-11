import {
    readFile,
    writeFile
} from 'node:fs/promises';

const DIST_TYPES_FILE = 'dist/types.d.cts';
const content = await readFile(DIST_TYPES_FILE, 'utf-8');
const newContent = content.replace(/Plugin\$1/g, 'Plugin');
await writeFile(DIST_TYPES_FILE, newContent, 'utf-8');
