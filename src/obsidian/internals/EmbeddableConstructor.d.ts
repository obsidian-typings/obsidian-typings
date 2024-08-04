import type {
    Component,
    TFile
} from "obsidian";
import type { EmbedContext } from "./EmbedContext.js";

/** @todo Documentation incomplete */
export type EmbeddableConstructor = (context: EmbedContext, file: TFile, path?: string) => Component;
