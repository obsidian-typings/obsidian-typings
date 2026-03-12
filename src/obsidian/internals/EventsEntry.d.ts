import type { Events } from 'obsidian';

/**
 * An entry representing a registered event handler.
 *
 * @public
 * @unofficial
 */
export interface EventsEntry {
  /** Context (`this` value) for the event handler callback. */
  ctx: unknown;

  /** Events object this handler is registered on. */
  e: Events;

  /** Event name this handler listens for. */
  name: string;

  /**
   * Event handler callback function.
   *
   * @param data - The event data arguments.
   * @returns The result of the event handler.
   */
  fn(...data: unknown[]): unknown;
}
