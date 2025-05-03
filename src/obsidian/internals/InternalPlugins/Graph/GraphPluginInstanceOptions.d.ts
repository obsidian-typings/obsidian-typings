import type { GraphColorGroup } from './GraphColorGroup.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface GraphPluginInstanceOptions {
    /** @todo Documentation incomplete. */
    'collapse-color-groups'?: boolean;

    /** @todo Documentation incomplete. */
    'collapse-display'?: boolean;

    /** @todo Documentation incomplete. */
    'collapse-filter'?: boolean;

    /** @todo Documentation incomplete. */
    'collapse-forces'?: boolean;

    /** @todo Documentation incomplete. */
    centerStrength?: number;

    /** @todo Documentation incomplete. */
    close?: boolean;

    /** @todo Documentation incomplete. */
    colorGroups?: GraphColorGroup[];

    /** @todo Documentation incomplete. */
    hideUnresolved?: boolean;

    /** @todo Documentation incomplete. */
    lineSizeMultiplier?: number;

    /** @todo Documentation incomplete. */
    linkDistance?: number;

    /** @todo Documentation incomplete. */
    linkStrength?: number;

    /** @todo Documentation incomplete. */
    localBacklinks?: boolean;

    /** @todo Documentation incomplete. */
    localForelinks?: boolean;

    /** @todo Documentation incomplete. */
    localInterlinks?: boolean;

    /** @todo Documentation incomplete. */
    localJumps?: number;

    /** @todo Documentation incomplete. */
    nodeSizeMultiplier?: number;

    /** @todo Documentation incomplete. */
    repelStrength?: number;

    /** @todo Documentation incomplete. */
    scale?: number;

    /** @todo Documentation incomplete. */
    search?: string;

    /** @todo Documentation incomplete. */
    showArrow?: boolean;

    /** @todo Documentation incomplete. */
    showAttachments?: boolean;

    /** @todo Documentation incomplete. */
    showOrphans?: boolean;

    /** @todo Documentation incomplete. */
    showTags?: boolean;

    /** @todo Documentation incomplete. */
    textFadeMultiplier?: number;
}
