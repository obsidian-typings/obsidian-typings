import type {
    Component,
    TFile
} from "obsidian";
import type { EmbedContext } from "../index.js";

/** @todo Documentation incomplete */
export type EmbeddableConstructor = (context: EmbedContext, file: TFile, path?: string) => Component;
