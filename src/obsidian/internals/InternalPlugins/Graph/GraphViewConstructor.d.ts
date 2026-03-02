import type { GraphView } from '../../InternalPlugins/Graph/GraphView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';

/**
 * Constructor for the global graph view.
 * @public
 * @unofficial
 */
export interface GraphViewConstructor extends TypedViewConstructor<GraphView> {}
