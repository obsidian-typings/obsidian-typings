import type {
    DataAdapter,
    Vault
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Vault constructor.
 *
 * @public
 * @unofficial
 */
export interface VaultConstructor extends ConstructorBase<[adapter: DataAdapter], Vault> {}
