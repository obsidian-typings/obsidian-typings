import type { EmptyView } from "./EmptyView.js";

/**
 * Views of plugins that have been deactivated become an UnknownView
 * @todo This is probably not the right term
 */
/** @public */
export interface UnknownView extends EmptyView {}
