import type {
  SplitDirection,
  ViewState
} from 'obsidian';

/**
 * Serialized representation of a workspace leaf or split for layout persistence.
 *
 * @public
 * @unofficial
 */
export interface LeafEntry {
  /** Child leaf entries if this is a split container. */
  children?: LeafEntry[];

  /** Split direction if this is a split container. */
  direction?: SplitDirection;

  /** Unique identifier for the leaf. */
  id: string;

  /** View state of the leaf. */
  state?: ViewState;

  /** Type of the leaf entry (e.g. "leaf", "split", "tabs"). */
  type: string;

  /** Width of the leaf in pixels, if applicable. */
  width?: number;
}
