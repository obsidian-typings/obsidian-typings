import type {
    App,
    BlockCache,
    SearchResult,
    TFile
} from "obsidian";
import type { Runnable } from "./Runnable.js";

export interface FileSuggestManager {
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Selection of files and their paths that can be matched to
     */
    fileSuggestions: null | { file: TFile | null; path: string }[];
    /**
     * Determine the source path of current context
     */
    getSourcePath: () => null | string;
    /**
     * Whether search should be vault-wide rather than scoped to current file
     */
    global: boolean;
    /**
     * Type of suggestions that should be provided
     */
    mode: "file" | "heading" | "block" | "display" | string;
    /**
     * Executor of the search
     */
    runnable: null | Runnable;

    /**
     * Get suggestions for block query
     */
    getBlockSuggestions(runner: Runnable, file: TFile, text: string): Promise<SearchResult[]>;
    /**
     * Get suggestions for display alias query
     */
    getDisplaySuggestions(
        runner: Runnable,
        linkpath: string,
        subpath: string,
        alias: string
    ): Promise<SearchResult[]>;
    /**
     * Get suggestions for file query
     */
    getFileSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;
    /**
     * Get suggestions for global block query
     */
    getGlobalBlockSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;
    /**
     * Get suggestions for global heading query
     */
    getGlobalHeadingSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;
    /**
     * Get suggestions for file heading query
     */
    getHeadingSuggestions(runner: Runnable, file: TFile, text: string): Promise<SearchResult[]>;
    /** @internal Generate instructions for specific actions in suggestion manager (e.g. accept, select, ...) */
    getInstructions(): [{ command: "string"; purpose: "string" }];
    /**
     * Get suggestions for current input text
     *
     * @remark Type is determined from text: e.g. [[Thi]] will give completions for files, [[Thi^]] for blocks, etc.
     */
    getSuggestionsAsync(runner: Runnable, text: string): Promise<SearchResult[]>;
    /**
     * Match search fragments to a block
     */
    matchBlock(
        path: string,
        file: TFile,
        block: BlockCache,
        sourcePath: null | string,
        content: string,
        text_parts: string[]
    ): SearchResult | null;
}
