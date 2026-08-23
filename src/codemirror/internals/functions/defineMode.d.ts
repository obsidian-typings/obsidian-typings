import type { Cm5ModeFactory } from '../Cm5ModeFactory.d.ts';

/**
 * Registers a new editor mode.
 *
 * @param name - The mode name.
 * @param modeFactory - The factory function that creates the mode.
 * @param dependencies - The names of the modes this mode is built on top of.
 * @public
 * @unofficial
 */
export declare function defineMode<T>(name: string, modeFactory: Cm5ModeFactory<T>, ...dependencies: string[]): void;
