import type {
    Component,
    TFile
} from "obsidian";
import type { EmbedContext } from "./index.d.ts";

export default EmbeddableConstructor;

/** @todo Documentation incomplete */
type EmbeddableConstructor = (context: EmbedContext, file: TFile, path?: string) => Component;
