import type { Events } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface EventsEntry {
    /**
     * @todo Documentation incomplete.
     */
    ctx: unknown;

    /**
     * @todo Documentation incomplete.
     */
    e: Events;

    /**
     * @todo Documentation incomplete.
     */
    name: string;

    /**
     * @todo Documentation incomplete.
     */
    fn(...data: unknown[]): unknown;
}
