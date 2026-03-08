import type {
    App,
    SecretComponent
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The SecretComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface SecretComponentConstructor extends ConstructorBase<[app: App, containerEl: HTMLElement], SecretComponent> {}
