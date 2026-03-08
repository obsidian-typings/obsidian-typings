import type { App } from 'obsidian';

/**
 * Command-line interface handler for Obsidian.
 * @public
 * @unofficial
 */
export interface Cli {
    /** Reference to the app. */
    app: App;

    /** Registered CLI command handlers. */
    handlers: Map<string, unknown>;

    /**
     * Format data as an ASCII tree.
     *
     * @param data - The data to format.
     * @returns The formatted ASCII tree string.
     */
    formatAsciiTree(data: unknown): string;

    /**
     * Format data as an ASCII tree with a root node.
     *
     * @param data - The data to format.
     * @returns The formatted ASCII tree string with root.
     */
    formatAsciiTreeWithRoot(data: unknown): string;

    /**
     * Format data as a diff output.
     *
     * @param data - The data to format.
     * @returns The formatted diff string.
     */
    formatDiff(data: unknown): string;

    /**
     * Format data as a table.
     *
     * @param data - The data to format.
     * @returns The formatted table string.
     */
    formatTable(data: unknown): string;

    /**
     * Initialize the CLI handler.
     */
    init(): void;

    /**
     * Register a CLI command handler.
     *
     * @param handler - The handler to register.
     */
    registerHandler(handler: unknown): void;

    /**
     * Try to resolve a file path from CLI input.
     *
     * @param path - The path to resolve.
     * @returns The resolved file, or `null`.
     */
    tryResolveFile(path: string): unknown;

    /**
     * Unregister a CLI command handler.
     *
     * @param id - The handler ID to unregister.
     */
    unregisterHandler(id: string): void;
}
