import type { ElectronScrubberItem } from './ElectronScrubberItem.d.ts';

/**
 * Options for creating a {@link ElectronTouchBarScrubber}.
 *
 * @public
 * @unofficial
 */
export interface ElectronTouchBarScrubberConstructorOptions {
  /**
   * Whether this scrubber is continuous.
   *
   * @default `true`
   */
  continuous?: boolean;

  /** An array of items to place in this scrubber. */
  items: ElectronScrubberItem[];

  /**
   * The mode of this scrubber.
   *
   * @default `free`
   */
  mode?: 'fixed' | 'free';

  /**
   * Selected overlay item style.
   *
   * @default `none`
   */
  overlayStyle?: 'background' | 'none' | 'outline';

  /**
   * Selected item style.
   *
   * @default `none`
   */
  selectedStyle?: 'background' | 'none' | 'outline';

  /**
   * Whether to show arrow buttons. Only shown if `items` is non-empty.
   *
   * @default `false`
   */
  showArrowButtons?: boolean;

  /** Callback invoked when the user taps any item. */
  highlight?(highlightedIndex: number): void;

  /** Callback invoked when the user taps an item that was not the last tapped item. */
  select?(selectedIndex: number): void;
}
