import type { App } from 'obsidian';
import type { AppMenuBarManager } from './AppMenuBarManager.d.ts';
import type { ConstructorBase } from './Constructors/ConstructorBase.d.ts';

/**
 * The AppMenuBarManager constructor.
 * @public
 * @unofficial
 */
export interface AppMenuBarManagerConstructor extends ConstructorBase<[app: App], AppMenuBarManager> {
    /**
     * Update the state of native menu items.
     *
     * @returns The result of updating menu items.
     */
    updateMenuItems(arg1: unknown, arg2: unknown): unknown;
}
