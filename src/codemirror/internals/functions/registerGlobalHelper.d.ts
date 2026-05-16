/**
 * Registers a global helper with a predicate.
 *
 * @param type - The helper type.
 * @param name - The helper name.
 * @param predicate - A predicate function to determine applicability.
 * @param value - The helper implementation.
 * @public
 * @unofficial
 */
export declare function registerGlobalHelper(type: string, name: string, predicate: unknown, value: unknown): void;
