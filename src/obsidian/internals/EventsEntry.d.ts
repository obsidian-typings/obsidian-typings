import type { Events } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface EventsEntry {
    ctx: unknown;
    e: Events;
    name: string;

    fn(...data: unknown[]): unknown;
}
