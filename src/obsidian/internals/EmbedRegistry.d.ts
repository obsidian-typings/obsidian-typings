import type { EmbeddableConstructor } from "../index.js";
import type {
    Events,
    TFile
} from "obsidian";
export interface EmbedRegistry extends Events {
    /**
     * Mapping of file extensions to constructors for embeddable widgets
     */
    embedByExtension: EmbedRegistryEmbedByExtensionRecord;

    /**
     * Get the embed constructor for a specific file type
     */
    getEmbedCreator(file: TFile): EmbeddableConstructor | null;
    /**
     * Check whether a file extension has a registered embed constructor
     */
    isExtensionRegistered(extension: string): boolean;
    /**
     * Register an embed constructor for a specific file extension
     */
    registerExtension(extension: string, embedCreator: EmbeddableConstructor): void;
    /**
     * Register an embed constructor for a list of file extensions
     */
    registerExtensions(extensions: string[], embedCreator: EmbeddableConstructor): void;
    /**
     * Unregister an embed constructor for a specific file extension
     */
    unregisterExtension(extension: string): void;
    /**
     * Unregister an embed constructor for a list of file extensions
     */
    unregisterExtensions(extensions: string[]): void;
}

export interface EmbedRegistryEmbedByExtensionRecord extends Record<string, EmbeddableConstructor> {}
