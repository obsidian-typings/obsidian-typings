import type { TFile } from 'obsidian';

/** @public */
export interface BacklinkViewBacklink {
    recomputeBacklink(backlinkFile: TFile): void;
}
