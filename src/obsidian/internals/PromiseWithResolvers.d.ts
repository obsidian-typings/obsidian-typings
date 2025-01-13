export {};

/**
 * Included in `ES2024.Promise` TypeScript lib.
 * Will be removed from `obsidian-typings` once `ES2024` TypeScript lib is released.
 *
 * @public
 */
export interface PromiseWithResolvers<T> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}
