import type {
    CanvasPluginInstance,
    PositionedReference
} from "../types.js";
import type {
    App,
    ReferenceCache,
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

export interface LinkUpdaters {
    [key: string]: LinkUpdater;
    canvas?: CanvasLinkUpdater;
}

interface CanvasLinkUpdater extends LinkUpdater {
    app: App;
    canvas: CanvasPluginInstance;
}

interface LinkUpdater {
    applyUpdates(file: TFile, updates: LinkChangeUpdate[]): Promise<void>;
    iterateReferences(callback: (path: string, reference: ReferenceCache) => void): void;
    renameSubpath(file: TFile, oldSubpath: string, newSubpath: string): Promise<void>;
}

export interface LinkChangeUpdate {
    change: string;
    reference: ReferenceCache;
    sourcePath: string;
}
