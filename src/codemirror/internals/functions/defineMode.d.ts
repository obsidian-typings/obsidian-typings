import type { Cm5ModeFactory } from '../Cm5ModeFactory.d.ts';

/**
 * Registers a new editor mode.
 *
 * @param name - The mode name.
 * @param modeFactory - The factory function that creates the mode.
 * @public
 * @unofficial
 */
export declare function defineMode<T>(name: string, modeFactory: Cm5ModeFactory<T>): void;
