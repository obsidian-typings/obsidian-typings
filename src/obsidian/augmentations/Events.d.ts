import type { EventsEntry } from '../internals/EventsEntry.d.ts';

declare module 'obsidian' {
    /**
     * Event emitter implementation
     */
    interface Events {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        _: Record<string, EventsEntry[]>;

        /**
         * Remove an event listener.
         *
         * @param name - The name of the event.
         * @param callback - The callback to remove.
         * @example
         * ```ts
         * events.off('my-event', myListener);
         * ```
         * @official
         */
        off(name: string, callback: (...data: unknown[]) => unknown): void;

        /**
         * Remove an event listener by reference.
         *
         * @param ref - The reference to the event listener.
         * @example
         * ```ts
         * events.offref(myRef);
         * ```
         * @official
         */
        offref(ref: EventRef): void;

        /**
         * Add an event listener.
         *
         * @param name - The name of the event.
         * @param callback - The callback to call when the event is triggered.
         * @param ctx - The context passed as `this` to the `callback`.
         * @returns A reference to the event listener.
         * @example
         * ```ts
         * events.on('my-event', (arg1, arg2) => {
         *     console.log(arg1, arg2);
         * });
         * ```
         * @official
         */
        on(name: string, callback: (...data: unknown[]) => unknown, ctx?: any): EventRef;

        /**
         * Trigger an event, executing all the listeners in order even if some of them throw an error.
         *
         * @param name - The name of the event.
         * @param data - The data to pass to the event listeners.
         * @example
         * ```ts
         * events.trigger('my-event', 'arg1', 'arg2');
         * ```
         * @official
         */
        trigger(name: string, ...data: unknown[]): void;

        /**
         * Try to trigger an event, executing all the listeners in order even if some of them throw an error.
         *
         * @param evt - The event reference.
         * @param args - The data to pass to the event listeners.
         * @example
         * ```ts
         * events.tryTrigger(myRef, ['arg1', 'arg2']);
         * ```
         * @official
         */
        tryTrigger(evt: EventRef, args: unknown[]): void;
    }
}
