import type {
    App,
    FileManager
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The FileManager constructor.
 *
 * @public
 * @unofficial
 */
export interface FileManagerConstructor extends ConstructorBase<[app: App], FileManager> {}
