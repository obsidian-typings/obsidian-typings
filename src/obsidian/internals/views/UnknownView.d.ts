import type { EmptyView } from "../views/EmptyView.js";
/**
 * Views of plugins that have been deactivated become an UnknownView
 * @todo This is probably not the right term
 */
export interface UnknownView extends EmptyView {}
