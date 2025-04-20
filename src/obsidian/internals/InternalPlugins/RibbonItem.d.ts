import type { IconName } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface RibbonItem {
    hidden: boolean;
    icon: IconName;
    id: string;
    title: string;

    callback(): Promise<void>;
}
