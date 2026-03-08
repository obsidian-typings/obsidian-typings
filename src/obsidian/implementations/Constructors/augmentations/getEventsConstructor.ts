import {
    Events
} from 'obsidian';
import type { EventsConstructor } from '../../../internals/Constructors/augmentations/EventsConstructor.ts';

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
