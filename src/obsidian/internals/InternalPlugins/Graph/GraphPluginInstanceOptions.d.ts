import type { GraphColorGroup } from './GraphColorGroup.d.ts';

/** @public */
export interface GraphPluginInstanceOptions {
    'collapse-color-groups'?: boolean;
    'collapse-display'?: boolean;
    'collapse-filter'?: boolean;
    'collapse-forces'?: boolean;
    centerStrength?: number;
    close?: boolean;
    colorGroups?: GraphColorGroup[];
    hideUnresolved?: boolean;
    lineSizeMultiplier?: number;
    linkDistance?: number;
    linkStrength?: number;
    localBacklinks?: boolean;
    localForelinks?: boolean;
    localInterlinks?: boolean;
    localJumps?: number;
    nodeSizeMultiplier?: number;
    repelStrength?: number;
    scale?: number;
    search?: string;
    showArrow?: boolean;
    showAttachments?: boolean;
    showOrphans?: boolean;
    showTags?: boolean;
    textFadeMultiplier?: number;
}
