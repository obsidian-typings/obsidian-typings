/**
 * Configuration options for Mermaid diagram rendering.
 *
 * @public
 * @unofficial
 */
export interface MermaidConfig {
  /** Architecture diagram configuration. */
  architecture?: Record<string, unknown>;

  /** Whether to use absolute arrow markers. */
  arrowMarkerAbsolute?: boolean;

  /** Block diagram configuration. */
  block?: Record<string, unknown>;

  /** C4 diagram configuration. */
  c4?: Record<string, unknown>;

  /** Class diagram configuration. */
  class?: Record<string, unknown>;

  /** Whether to use deterministic IDs. */
  deterministicIds?: boolean;

  /** Seed for deterministic ID generation. */
  deterministicIDSeed?: string;

  /** Entity relationship diagram configuration. */
  er?: Record<string, unknown>;

  /** Flowchart diagram configuration. */
  flowchart?: Record<string, unknown>;

  /** Font family for the diagrams. */
  fontFamily?: string;

  /** Font size for the diagrams. */
  fontSize?: number;

  /** Gantt chart configuration. */
  gantt?: Record<string, unknown>;

  /** Git graph configuration. */
  gitGraph?: Record<string, unknown>;

  /** Journey diagram configuration. */
  journey?: Record<string, unknown>;

  /** Kanban board configuration. */
  kanban?: Record<string, unknown>;

  /** Log level for Mermaid. */
  logLevel?: number | string;

  /** Maximum number of edges allowed. */
  maxEdges?: number;

  /** Maximum text size allowed. */
  maxTextSize?: number;

  /** Mindmap diagram configuration. */
  mindmap?: Record<string, unknown>;

  /** Packet diagram configuration. */
  packet?: Record<string, unknown>;

  /** Pie chart configuration. */
  pie?: Record<string, unknown>;

  /** Quadrant chart configuration. */
  quadrantChart?: Record<string, unknown>;

  /** Requirement diagram configuration. */
  requirement?: Record<string, unknown>;

  /** Sankey diagram configuration. */
  sankey?: Record<string, unknown>;

  /** List of secure keys. */
  secure?: string[];

  /** Security level for rendering. */
  securityLevel?: 'antiscript' | 'loose' | 'sandbox' | 'strict';

  /** Sequence diagram configuration. */
  sequence?: Record<string, unknown>;

  /** Whether to start rendering on page load. */
  startOnLoad?: boolean;

  /** State diagram configuration. */
  state?: Record<string, unknown>;

  /** Whether to suppress error rendering. */
  suppressErrorRendering?: boolean;

  /** Custom theme name. */
  theme?: string;

  /** Custom theme CSS. */
  themeCSS?: string;

  /** Custom theme variables. */
  themeVariables?: Record<string, string>;

  /** Timeline diagram configuration. */
  timeline?: Record<string, unknown>;

  /** Whether to enable text wrapping. */
  wrap?: boolean;

  /** XY chart configuration. */
  xy?: Record<string, unknown>;

  /** Additional configuration options. */
  [key: string]: unknown;
}
