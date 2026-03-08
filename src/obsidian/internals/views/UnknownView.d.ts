import type { EmptyView } from './EmptyView.d.ts';

/**
 * Views of plugins that have been deactivated become an UnknownView.
 *
 * @remark This is probably not the right term.
 * @public
 * @unofficial
 */
export interface UnknownView extends EmptyView {}
