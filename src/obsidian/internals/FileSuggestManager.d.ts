import type {
  App,
  BlockCache,
  Instruction,
  SearchResult,
  TFile
} from 'obsidian';

import type { FileSuggestion } from './FileSuggestion.d.ts';
import type { Runnable } from './Runnable.d.ts';

/**
 * File suggest manager.
 * @public
 * @unofficial
 */
export interface FileSuggestManager {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Selection of files and their paths that can be matched to.
   */
  fileSuggestions: FileSuggestion[] | null;

  /**
   * Whether search should be vault-wide rather than scoped to current file.
   */
  global: boolean;

  /**
   * Type of suggestions that should be provided.
   */
  mode: 'block' | 'display' | 'file' | 'heading' | string;

  /**
   * Executor of the search.
   */
  runnable: null | Runnable;

  /**
   * Get suggestions for block query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param file - File to search within.
   * @param text - Search query text.
   * @returns Matching block suggestions.
   */
  getBlockSuggestions(runner: Runnable, file: TFile, text: string): Promise<SearchResult[]>;

  /**
   * Get suggestions for display alias query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param linkpath - Link path to resolve.
   * @param subpath - Subpath within the file.
   * @param alias - Alias text to search.
   * @returns Matching display suggestions.
   */
  getDisplaySuggestions(runner: Runnable, linkpath: string, subpath: string, alias: string): Promise<SearchResult[]>;

  /**
   * Get suggestions for file query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param text - Search query text.
   * @returns Matching file suggestions.
   */
  getFileSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;

  /**
   * Get suggestions for global block query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param text - Search query text.
   * @returns Matching global block suggestions.
   */
  getGlobalBlockSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;

  /**
   * Get suggestions for global heading query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param text - Search query text.
   * @returns Matching global heading suggestions.
   */
  getGlobalHeadingSuggestions(runner: Runnable, text: string): Promise<SearchResult[]>;

  /**
   * Get suggestions for file heading query.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param file - File to search within.
   * @param text - Search query text.
   * @returns Matching heading suggestions.
   */
  getHeadingSuggestions(runner: Runnable, file: TFile, text: string): Promise<SearchResult[]>;

  /**
   * Generate instructions for specific actions in suggestion manager (e.g. accept, select, ...).
   *
   * @returns Array of instructions.
   */
  getInstructions(): [Instruction];

  /**
   * Determine the source path of current context.
   *
   * @returns Source path string, or `null`.
   */
  getSourcePath(): null | string;

  /**
   * Get suggestions for current input text.
   *
   * @param runner - Runnable controlling the search lifecycle.
   * @param text - Search query text.
   * @returns Matching suggestions.
   * @remark Type is determined from text: e.g. [[Thi]] will give completions for files, [[Thi^]] for blocks, etc.
   */
  getSuggestionsAsync(runner: Runnable, text: string): Promise<SearchResult[]>;

  /**
   * Match search fragments to a block.
   *
   * @param path - Path of the file.
   * @param file - File containing the block.
   * @param block - Block cache entry to match against.
   * @param sourcePath - Source path for link resolution.
   * @param content - Content of the block.
   * @param textParts - Search fragments to match.
   * @returns Search result if matched, or `null`.
   */
  matchBlock(
    path: string,
    file: TFile,
    block: BlockCache,
    sourcePath: null | string,
    content: string,
    textParts: string[]
  ): null | SearchResult;
}
