import type {
    App,
    MetadataCache,
    Vault
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MetadataCache constructor.
 *
 * @public
 * @unofficial
 */
export interface MetadataCacheConstructor extends ConstructorBase<[app: App, vault: Vault], MetadataCache> {}
