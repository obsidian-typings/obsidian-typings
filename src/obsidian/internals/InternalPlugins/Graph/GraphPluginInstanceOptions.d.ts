export interface GraphPluginInstanceOptions {
    centerStrength?: number;
    close?: boolean;
    'collapse-color-groups'?: boolean;
    'collapse-display'?: boolean;
    'collapse-filter'?: boolean;
    'collapse-forces'?: boolean;
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

export class GraphColorGroup {
    color: GraphColorAttributes;
    query: string;
}

export type GraphColorAttributes = {
    a: number,
    rgb: number
}