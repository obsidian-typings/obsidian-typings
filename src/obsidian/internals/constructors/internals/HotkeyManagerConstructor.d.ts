import type { App } from 'obsidian';
import type { HotkeyManager } from '../../hotkey-manager/HotkeyManager.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The HotkeyManager constructor.
 *
 * @public
 * @unofficial
 */
export interface HotkeyManagerConstructor extends ConstructorBase<[app: App], HotkeyManager> {}
