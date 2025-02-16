import type { WorkspaceLeaf } from 'obsidian';
import type { OutlinePluginInstance } from '../../InternalPlugins/Outline/OutlinePluginInstance.d.ts';
import type { OutlineView } from '../../InternalPlugins/Outline/OutlineView.d.ts';

/**
 * A constructor for an outline view.
 *
 * @public
 */
export type OutlineViewConstructor = new(
    leaf: WorkspaceLeaf,
    outlinePluginInstance: OutlinePluginInstance
) => OutlineView;
