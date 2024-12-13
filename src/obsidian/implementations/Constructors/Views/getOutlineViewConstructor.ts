import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { OutlinePluginInstance } from '../../../internals/InternalPlugins/Outline/OutlinePluginInstance.js';
import type { OutlineView } from '../../../internals/InternalPlugins/Outline/OutlineView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the OutlineView constructor.
 *
 * @returns The OutlineView constructor.
 */

export function getOutlineViewConstructor(app: App): OutlineViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Outline) as OutlineViewConstructor;
}

type OutlineViewConstructor = new(leaf: WorkspaceLeaf, outlinePluginInstance: OutlinePluginInstance) => OutlineView;
