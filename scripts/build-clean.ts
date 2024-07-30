import { rm, readdir } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });

const files = await readdir("src/implementations");
const dtsFiles = files.filter(file => file.endsWith(".d.ts"));

for (const file of dtsFiles) {
    await rm(`src/implementations/${file}`);
}
