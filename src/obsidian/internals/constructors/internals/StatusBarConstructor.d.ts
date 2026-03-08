import type { App } from 'obsidian';
import type { StatusBar } from '../../StatusBar.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The StatusBar constructor.
 *
 * @public
 * @unofficial
 */
export interface StatusBarConstructor extends ConstructorBase<[app: App, containerEl: HTMLElement], StatusBar> {}
