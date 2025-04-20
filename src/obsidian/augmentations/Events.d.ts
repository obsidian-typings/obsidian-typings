import type { EventsEntry } from '../internals/EventsEntry.d.ts';

declare module 'obsidian' {
    interface Events {
        /**
         * @unofficial
         */
        _: Record<string, EventsEntry[]>;
    }
}
