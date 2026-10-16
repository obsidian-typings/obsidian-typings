import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { FileExplorerView } from '../../../internals/internal-plugins/file-explorer/FileExplorerView.d.ts';
import type { ObsidianSearchQuery } from '../../../internals/search-query/ObsidianSearchQuery.d.ts';

import { ViewType } from '../../constants/ViewType.ts';

/**
 * Get the {@link ObsidianSearchQuery} constructor.
 *
 * The class has no reachable instance until a query is compiled, so a throwaway file explorer view is created
 * on a temporary leaf, a probe filter query is compiled through it, and the constructor is read off the result.
 * The leaf is detached before returning.
 *
 * @param app - The app instance.
 * @returns The {@link ObsidianSearchQuery} constructor.
 *
 * @public
 * @unofficial
 */
export function getObsidianSearchQueryConstructor(app: App): ExtractConstructor<ObsidianSearchQuery> {
  const leaf = app.workspace.createLeafInTabGroup();
  try {
    const viewCreator = app.viewRegistry.getViewCreatorByType(ViewType.FileExplorer);
    if (!viewCreator) {
      throw new Error('View creator not found');
    }
    const view = viewCreator(leaf) as FileExplorerView;
    view.onSearchChanged('probe');
    if (!view.searchQuery) {
      throw new Error('The probe query did not compile.');
    }
    return view.searchQuery.constructor as ExtractConstructor<ObsidianSearchQuery>;
  } finally {
    leaf.detach();
  }
}
