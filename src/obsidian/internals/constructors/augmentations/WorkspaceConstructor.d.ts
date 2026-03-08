import type {
    App,
    Workspace
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Workspace constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceConstructor extends ConstructorBase<[app: App, containerEl: HTMLElement], Workspace> {}
