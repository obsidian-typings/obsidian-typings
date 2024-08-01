import {
    readdir,
    rm
} from "node:fs/promises";
await rm("dist", { recursive: true, force: true });

const files = await readdir("src/obsidian/implementations");
const dtsFiles = files.filter(file => file.endsWith(".d.ts"));

for (const file of dtsFiles) {
    await rm(`src/obsidian/implementations/${file}`);
}
