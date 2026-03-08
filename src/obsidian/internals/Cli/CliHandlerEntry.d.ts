import type { CliFlag } from 'obsidian';

/**
 * Entry stored in the CLI handlers map.
 * @public
 * @unofficial
 */
export interface CliHandlerEntry {
    /** The handler function. */
    handler: (...args: unknown[]) => unknown;

    /** Description shown in help. */
    description: string;

    /** Flags accepted by this handler. */
    flags?: Record<string, CliFlag>;
}
