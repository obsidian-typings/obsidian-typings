import type { WorkspaceLeaf } from 'obsidian';
import type { OutlinePluginInstance } from '../../InternalPlugins/Outline/OutlinePluginInstance.js';
import type { OutlineView } from '../../InternalPlugins/Outline/OutlineView.js';

/**
 * A constructor for an outline view.
 *
 * @public
 */
export type OutlineViewConstructor = new(
    leaf: WorkspaceLeaf,
    outlinePluginInstance: OutlinePluginInstance
) => OutlineView;
