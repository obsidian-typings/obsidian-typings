import type { GraphView } from '../../internal-plugins/graph/GraphView.d.ts';
import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';

/**
 * Constructor for the global graph view.
 * @public
 * @unofficial
 */
export interface GraphViewConstructor extends TypedViewConstructor<GraphView> {}
