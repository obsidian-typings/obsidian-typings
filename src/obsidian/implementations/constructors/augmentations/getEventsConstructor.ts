import {
    Events
} from 'obsidian';
import type { ConstructorBase } from '../../../internals/constructors/ConstructorBase.d.ts';

type EventsConstructor = ConstructorBase<[], Events>;

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
