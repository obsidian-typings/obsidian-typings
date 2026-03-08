import {
    Events
} from 'obsidian';
import type { EventsConstructor } from '../../../internals/constructors/augmentations/EventsConstructor.d.ts';

/**
 * Get the Events constructor.
 *
 * @returns The Events constructor.
 *
 * @public
 * @unofficial
 */
export function getEventsConstructor(): EventsConstructor {
    return Events as EventsConstructor;
}
