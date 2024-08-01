import type { PositionedReference } from "../index.js";
import type {
    App,
    TFile
} from "obsidian";

export interface LinkUpdate {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Link position in the file
     */
    reference: PositionedReference;
    /**
     * File that was resolved
     */
    resolvedFile: TFile;
    /**
     * Paths the file could have been resolved to
     */
    resolvedPaths: string[];
    /**
     * File that contains the link
     */
    sourceFile: TFile;
}
