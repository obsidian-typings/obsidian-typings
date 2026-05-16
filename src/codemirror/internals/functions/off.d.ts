/**
 * Removes an event handler from the given target.
 *
 * @param target - The target object.
 * @param type - The event type.
 * @param f - The event handler to remove.
 * @public
 * @unofficial
 */
export declare function off(target: unknown, type: string, f: (...args: unknown[]) => void): void;
