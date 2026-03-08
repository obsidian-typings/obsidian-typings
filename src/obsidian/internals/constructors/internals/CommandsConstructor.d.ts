import type { Commands } from '../../commands/Commands.d.ts';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The Commands constructor.
 *
 * @public
 * @unofficial
 */
export type CommandsConstructor = ExtractConstructor<Commands>;
