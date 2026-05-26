import type { Cm5Editor } from '../Cm5Editor.d.ts';
import type { Cm5Mode } from '../Cm5Mode.d.ts';

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
export declare function registerGlobalHelper(type: string, name: string, predicate: (mode: Cm5Mode<unknown>, cm: Cm5Editor) => boolean, value: unknown): void;
