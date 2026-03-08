import type { Cli } from '../../cli/Cli.d.ts';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The Cli constructor.
 *
 * @public
 * @unofficial
 */
export type CliConstructor = ExtractConstructor<Cli>;
