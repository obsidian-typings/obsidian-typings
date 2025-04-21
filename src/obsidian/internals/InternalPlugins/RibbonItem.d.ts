import type { IconName } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface RibbonItem {
    /** @todo Documentation incomplete. */
    hidden: boolean;

    /** @todo Documentation incomplete. */
    icon: IconName;

    /** @todo Documentation incomplete. */
    id: string;

    /** @todo Documentation incomplete. */
    title: string;

    /** @todo Documentation incomplete. */
    callback(): Promise<void>;
}
