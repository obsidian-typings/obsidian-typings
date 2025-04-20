import type { EventsEntry } from '../internals/EventsEntry.d.ts';

declare module 'obsidian' {
    interface Events {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        _: Record<string, EventsEntry[]>;
    }
}
