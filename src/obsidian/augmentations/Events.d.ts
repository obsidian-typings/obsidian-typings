import type { EventsEntry } from '../internals/EventsEntry.d.ts';

declare module 'obsidian' {
    interface Events {
        _: Record<string, EventsEntry[]>;
    }
}
