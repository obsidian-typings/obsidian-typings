import { cp } from "node:fs/promises";

await cp("src/style-mod/style-mod.d.cts.dist", "dist/style-mod.d.cts");
