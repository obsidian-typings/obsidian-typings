import type { EmptyView } from "../types.js";
/**
 * Views of plugins that have been deactivated become an UnknownView
 * @todo This is probably not the right term
 * @todo Documentation incomplete 
 */
export interface UnknownView extends EmptyView {
}
