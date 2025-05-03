import type { CachedMetadata } from 'obsidian';
import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultDomItem } from './ResultDomItem.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ResultDomItemChild extends TreeNode {
    /** @todo Documentation incomplete. */
    cache: CachedMetadata;

    /** @todo Documentation incomplete. */
    content: string;

    /** @todo Documentation incomplete. */
    end: number;

    /** @todo Documentation incomplete. */
    info: TreeNodeInfo;

    /** @todo Documentation incomplete. */
    matches: ContentPosition[];

    /** @todo Documentation incomplete. */
    mutateEState: unknown;

    /** @todo Documentation incomplete. */
    onMatchRender: unknown;

    /** @todo Documentation incomplete. */
    parent: ResultDomItem;

    /** @todo Documentation incomplete. */
    parentDom: ResultDomItem;

    /** @todo Documentation incomplete. */
    showMoreAfterEl: HTMLElement;

    /** @todo Documentation incomplete. */
    showMoreBeforeEl: HTMLElement;

    /** @todo Documentation incomplete. */
    start: number;

    /** @todo Documentation incomplete. */
    getNextPos(arg1: unknown): number;

    /** @todo Documentation incomplete. */
    getPrevPos(arg1: unknown): number;

    /** @todo Documentation incomplete. */
    onFocusEnter(event?: UIEvent): void;

    /** @todo Documentation incomplete. */
    onFocusExit(event?: UIEvent): void;

    /** @todo Documentation incomplete. */
    onResultClick(event: UIEvent): void;

    /** @todo Documentation incomplete. */
    render(hasTextBefore: boolean, hasTextAfter: boolean): void;

    /** @todo Documentation incomplete. */
    showMoreAfter(): void;

    /** @todo Documentation incomplete. */
    showMoreBefore(): void;

    /** @todo Documentation incomplete. */
    toggleShowMoreContextButtons(): void;
}
