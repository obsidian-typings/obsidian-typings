import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';

/**
 * Filter map determining which files appear in the graph, keyed by file path with color or visibility values.
 * @public
 * @unofficial
 */
export interface GraphFileFilter extends Record<string, GraphColorAttributes | boolean> {}
