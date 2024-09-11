import {
    readdir,
    rm
} from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });

const files = await readdir('src/obsidian/implementations', { recursive: true });
const dtsFiles = files.filter(file => file.endsWith('.d.ts'));

for (const file of dtsFiles) {
    await rm(`src/obsidian/implementations/${file}`);
}

await rm('src/index.d.ts', { force: true });
await rm('src/obsidian/implementations/index.ts', { force: true });
