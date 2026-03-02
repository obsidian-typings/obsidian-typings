import type { IconName } from 'obsidian';

/**
 * Represents a button item in the sidebar ribbon.
 * @public
 * @unofficial
 */
export interface RibbonItem {
    /** Whether this ribbon item is hidden. */
    hidden: boolean;

    /** Icon name displayed for this ribbon item. */
    icon: IconName;

    /** Unique identifier for this ribbon item. */
    id: string;

    /** Tooltip title displayed on hover. */
    title: string;

    /** Callback invoked when this ribbon item is clicked. */
    callback(): Promise<void>;
}
