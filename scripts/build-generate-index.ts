import {
    readdir,
    writeFile
} from "node:fs/promises";
import {
    basename,
    extname,
    relative
} from "node:path/posix";

async function main(): Promise<void> {
    await generateIndex("src", "src/index.d.ts");
    await generateIndex("src/obsidian/implementations", "src/obsidian/implementations/index.ts");
}

async function generateIndex(dir: string, indexFile: string): Promise<void> {
    const extension = getExtension(indexFile);
    const files = (await readdir(dir, { recursive: true })).filter(file => {
        const fileExtension = getExtension(file);
        return fileExtension === extension && basename(file, extension) !== "index";
    });
    const lines = files.map(file => generateExportLine(file, dir));
    await writeFile(indexFile, lines.join("\n"), "utf-8");
}

function generateExportLine(file: string, dir: string): string {
    file = file.replace(/\\/g, "/");
    const jsFile = file.replace(getExtension(file), ".js");
    return `export * from "./${jsFile}";`;
}

function getExtension(file: string): string {
    if (file.endsWith(".d.ts")) {
        return ".d.ts";
    }

    return extname(file);
}

await main();
