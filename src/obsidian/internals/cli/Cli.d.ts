import type {
    App,
    CliFlag,
    TFile
} from 'obsidian';
import type { CliHandlerEntry } from './CliHandlerEntry.d.ts';
import type { CliTreeNode } from './CliTreeNode.d.ts';

/**
 * Command-line interface handler for Obsidian.
 * @public
 * @unofficial
 */
export interface Cli {
    /** Reference to the app. */
    app: App;

    /**
     * Format tree nodes as an ASCII tree.
     *
     * @param nodes - The tree nodes to format.
     * @param prefix - The indentation prefix for nested nodes.
     * @returns The formatted ASCII tree string.
     */
    formatAsciiTree(nodes: CliTreeNode[], prefix?: string): string;

    /**
     * Format a root label and child nodes as an ASCII tree.
     *
     * @param root - The root label.
     * @param children - The child tree nodes.
     * @returns The formatted ASCII tree string with root.
     */
    formatAsciiTreeWithRoot(root: string, children: CliTreeNode[]): string;

    /**
     * Format two strings as a unified diff.
     *
     * @param oldText - The original text.
     * @param newText - The modified text.
     * @param oldName - The label for the original text.
     * @param newName - The label for the modified text.
     * @returns The formatted diff string.
     */
    formatDiff(oldText: string, newText: string, oldName: string, newName: string): string;

    /**
     * Format data as a table in JSON, CSV, or TSV format.
     *
     * @param headers - Column header names.
     * @param rows - Row data as arrays of strings.
     * @param format - Output format.
     * @returns The formatted table string.
     */
    formatTable(headers: string[], rows: string[][], format: 'json' | 'csv' | 'tsv'): string;

    /** Registered CLI command handlers. */
    handlers: Map<string, CliHandlerEntry>;

    /**
     * Initialize the CLI handler, registering the global `handleCli` function.
     */
    init(): void;

    /**
     * Register a CLI command handler.
     *
     * @param id - The command identifier.
     * @param description - Description shown in help.
     * @param flags - Flags accepted by this command, or `null` for none.
     * @param handler - The handler function.
     */
    registerHandler(
        id: string,
        description: string,
        flags: Record<string, CliFlag> | null,
        handler: (...args: unknown[]) => unknown
    ): void;

    /**
     * Try to resolve a file from CLI input parameters.
     *
     * @param params - Object with optional `path` or `file` properties.
     * @param requireFile - Whether a file is required (throws if not found when `true`).
     * @returns The resolved file.
     */
    tryResolveFile(params: { path?: string; file?: string }, requireFile?: boolean): TFile;

    /**
     * Unregister a CLI command handler.
     *
     * @param id - The command identifier to unregister.
     * @param handler - Optional handler function to match before unregistering.
     */
    unregisterHandler(id: string, handler?: (...args: unknown[]) => unknown): void;
}
