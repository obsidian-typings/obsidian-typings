import type {
    App,
    Modal
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Modal constructor.
 *
 * @public
 * @unofficial
 */
export interface ModalConstructor extends ConstructorBase<[app: App], Modal> {}
