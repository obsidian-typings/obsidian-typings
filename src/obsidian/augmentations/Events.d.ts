import type { EventsEntry } from '../internals/EventsEntry.js';

declare module 'obsidian' {
    interface Events {
        _: Record<string, EventsEntry[]>;
    }
}
