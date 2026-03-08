import type {
    App,
    SecretStorage
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The SecretStorage constructor.
 *
 * @public
 * @unofficial
 */
export interface SecretStorageConstructor extends ConstructorBase<[app: App], SecretStorage> {}
