import type { GraphColorGroup } from './GraphColorGroup.d.ts';

/**
 * User-configurable options for the graph plugin, persisted in graph.json.
 * @public
 * @unofficial
 */
export interface GraphPluginInstanceOptions {
  /** Strength of the centering force pulling nodes toward the graph center. */
  centerStrength?: number;

  /** Whether the graph settings panel is closed. */
  close?: boolean;

  /** Whether the color groups section is collapsed in the settings panel. */
  'collapse-color-groups'?: boolean;

  /** Whether the display section is collapsed in the settings panel. */
  'collapse-display'?: boolean;

  /** Whether the filter section is collapsed in the settings panel. */
  'collapse-filter'?: boolean;

  /** Whether the forces section is collapsed in the settings panel. */
  'collapse-forces'?: boolean;

  /** User-defined color groups for visually grouping nodes by search query. */
  colorGroups?: GraphColorGroup[];

  /** Whether to hide unresolved (non-existing) linked notes from the graph. */
  hideUnresolved?: boolean;

  /** Multiplier for the thickness of link lines. */
  lineSizeMultiplier?: number;

  /** Ideal distance between linked nodes in the force simulation. */
  linkDistance?: number;

  /** Strength of the attractive force between linked nodes. */
  linkStrength?: number;

  /** Whether to show backlinks in the local graph. */
  localBacklinks?: boolean;

  /** Whether to show forward links in the local graph. */
  localForelinks?: boolean;

  /** Whether to show links between neighbor nodes in the local graph. */
  localInterlinks?: boolean;

  /** Number of link hops to traverse from the current note in the local graph. */
  localJumps?: number;

  /** Multiplier for the size of nodes. */
  nodeSizeMultiplier?: number;

  /** Strength of the repulsive force pushing nodes apart. */
  repelStrength?: number;

  /** Zoom scale level of the graph view. */
  scale?: number;

  /** Search query used to filter which files appear in the graph. */
  search?: string;

  /** Whether to display directional arrows on links. */
  showArrow?: boolean;

  /** Whether to display attachment files in the graph. */
  showAttachments?: boolean;

  /** Whether to display orphan notes (notes with no links) in the graph. */
  showOrphans?: boolean;

  /** Whether to display tags as nodes in the graph. */
  showTags?: boolean;

  /** Multiplier controlling the distance at which node labels begin to fade. */
  textFadeMultiplier?: number;
}
