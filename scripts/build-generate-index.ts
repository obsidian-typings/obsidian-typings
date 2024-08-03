import { existsSync } from "node:fs";
import {
    readdir,
    rm,
    writeFile
} from "node:fs/promises";
import {
    basename,
    extname,
    join,
    relative
} from "node:path/posix";

async function main(): Promise<void> {
    await generateIndex("src", "src/index.d.ts");
    await generateIndex("src/obsidian/implementations", "src/obsidian/implementations/index.ts");
}

async function generateIndex(dir: string, indexFile: string): Promise<void> {
    await rm(indexFile, { force: true });
    const files = await getFilesRecursively(dir, getExtension(indexFile));
    const lines = files.map(file => generateExportLine(file, dir));
    await writeFile(indexFile, lines.join("\n"), "utf-8");
}

async function getFilesRecursively(dir: string, extension: string): Promise<string[]> {
    if (existsSync(join(dir, ".skip"))) {
        return [];
    }

    const files: string[] = [];
    for (const dirent of await readdir(dir, { withFileTypes: true })) {
        if (dirent.isDirectory()) {
            files.push(...await getFilesRecursively(join(dir, dirent.name), extension));
        } else if (dirent.name.endsWith(extension)) {
            files.push(join(dir, dirent.name));
        }
    }

    return files;
}

function generateExportLine(file: string, dir: string): string {
    const jsFile = file.replace(getExtension(file), ".js");
    const relativePath = relative(dir, jsFile);
    return `export * from "./${relativePath}";`;
}

function getExtension(file: string): string {
    if (file.endsWith(".d.ts")) {
        return ".d.ts";
    }

    return extname(file);
}

await main();
