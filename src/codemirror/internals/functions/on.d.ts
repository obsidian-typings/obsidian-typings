/**
 * Registers an event handler on the given target.
 *
 * @param target - The target object.
 * @param type - The event type.
 * @param f - The event handler.
 * @public
 * @unofficial
 */
export declare function on(target: unknown, type: string, f: (...args: unknown[]) => void): void;
