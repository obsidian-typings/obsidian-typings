import type { Workspace } from 'obsidian';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The Workspace constructor.
 *
 * @public
 * @unofficial
 */
export type WorkspaceConstructor = ExtractConstructor<Workspace>;
