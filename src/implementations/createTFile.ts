import {
    TFile,
    type Vault
} from "obsidian";
import { createTFolder } from "./index.ts";

type TFileConstructor = { new(vault: Vault, path: string): TFile };

export function createTFile(vault: Vault, path: string) {
    let file = vault.getFileByPath(path);
    if (file) {
        return file;
    }

    file = new (TFile as TFileConstructor)(vault, path);
    file.parent = createTFolder(vault, vault.adapter.path.dirname(path));
    return file;
}
