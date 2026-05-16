import type { Cm5Editor } from '../Cm5Editor.d.ts';

/**
 * Registers a function to be called when an editor is initialized.
 *
 * @param f - The initialization hook function.
 * @public
 * @unofficial
 */
export declare function defineInitHook(f: (cm: Cm5Editor) => void): void;
