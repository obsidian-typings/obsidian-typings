import type { Cm5Editor } from '../Cm5Editor.d.ts';

/**
 * Registers a new editor option.
 *
 * @param name - The option name.
 * @param defaultValue - The default value for the option.
 * @param onUpdate - The update handler called when the option changes.
 * @public
 * @unofficial
 */
export declare function defineOption(name: string, defaultValue: unknown, onUpdate: (editor: Cm5Editor, val: unknown, old: unknown) => void): void;
