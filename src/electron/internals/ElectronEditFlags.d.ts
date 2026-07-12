/**
 * Flags indicating which editing actions the renderer believes it can perform.
 *
 * @public
 * @unofficial
 */
export interface ElectronEditFlags {
  /** Whether the renderer believes it can copy. */
  canCopy: boolean;

  /** Whether the renderer believes it can cut. */
  canCut: boolean;

  /** Whether the renderer believes it can delete. */
  canDelete: boolean;

  /** Whether the renderer believes it can edit text richly. */
  canEditRichly: boolean;

  /** Whether the renderer believes it can paste. */
  canPaste: boolean;

  /** Whether the renderer believes it can redo. */
  canRedo: boolean;

  /** Whether the renderer believes it can select all. */
  canSelectAll: boolean;

  /** Whether the renderer believes it can undo. */
  canUndo: boolean;
}
