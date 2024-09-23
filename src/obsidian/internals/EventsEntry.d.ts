import type { Events } from 'obsidian';

/**
 * @public
 */
export interface EventsEntry {
    ctx: unknown;
    e: Events;
    name: string;

    fn(...data: unknown[]): unknown;
}
