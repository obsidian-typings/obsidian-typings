import type {
    ReferenceCache,
    TFile
} from 'obsidian';
import type { LinkChangeUpdate } from './LinkChangeUpdate.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface LinkUpdater {
    /** @todo Documentation incomplete. */
    applyUpdates(file: TFile, updates: LinkChangeUpdate[]): Promise<void>;

    /** @todo Documentation incomplete. */
    iterateReferences(callback: (path: string, reference: ReferenceCache) => void): void;

    /** @todo Documentation incomplete. */
    renameSubpath(file: TFile, oldSubpath: string, newSubpath: string): Promise<void>;
}
