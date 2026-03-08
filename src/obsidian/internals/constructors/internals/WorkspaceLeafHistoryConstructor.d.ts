import type { WorkspaceLeaf } from 'obsidian';
import type { WorkspaceLeafHistory } from '../../workspace-leaf-history/WorkspaceLeafHistory.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The WorkspaceLeafHistory constructor.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceLeafHistoryConstructor extends ConstructorBase<[owner: WorkspaceLeaf], WorkspaceLeafHistory> {}
