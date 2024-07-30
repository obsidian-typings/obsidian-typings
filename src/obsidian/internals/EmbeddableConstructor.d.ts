import type { EmbedContext } from "../types.js";
import type {
    Component,
    TFile
} from "obsidian";

/** @todo Documentation incomplete */
export type EmbeddableConstructor = (context: EmbedContext, file: TFile, path?: string) => Component;
