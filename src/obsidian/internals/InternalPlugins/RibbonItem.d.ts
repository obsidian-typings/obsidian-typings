import type { IconName } from 'obsidian';

/** @public */
export interface RibbonItem {
    hidden: boolean;
    icon: IconName;
    id: string;
    title: string;

    callback(): Promise<void>;
}
