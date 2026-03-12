import type { SerializedWorkspaceLeftRibbonHiddenItemsRecord } from './SerializedWorkspaceLeftRibbonHiddenItemsRecord.d.ts';

/**
 * Serialized representation of the left ribbon bar state.
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceLeftRibbon {
  /** Record of ribbon items and whether they are hidden. */
  hiddenItems: SerializedWorkspaceLeftRibbonHiddenItemsRecord;
}
