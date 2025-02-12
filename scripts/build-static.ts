import {
    cp,
    readdir
} from 'node:fs/promises';
import { join } from 'node:path/posix';

for (const file of await readdir('static')) {
    await cp(join('static', file), join('dist', file));
}
