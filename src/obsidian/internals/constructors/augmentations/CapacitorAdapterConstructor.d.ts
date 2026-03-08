import type { CapacitorAdapter } from 'obsidian';
import type { CapacitorAdapterFs } from '../../CapacitorAdapterFs.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The CapacitorAdapter constructor.
 *
 * @public
 * @unofficial
 */
export interface CapacitorAdapterConstructor extends ConstructorBase<[basePath: string, fs: CapacitorAdapterFs], CapacitorAdapter> {}
