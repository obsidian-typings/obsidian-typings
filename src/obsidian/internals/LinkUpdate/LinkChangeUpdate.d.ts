import type { ReferenceCache } from "obsidian";
export interface LinkChangeUpdate {
    change: string;
    reference: ReferenceCache;
    sourcePath: string;
}
