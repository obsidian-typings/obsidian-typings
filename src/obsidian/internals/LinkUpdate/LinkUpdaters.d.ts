import type { CanvasLinkUpdater } from './CanvasLinkUpdater.d.ts';
import type { LinkUpdater } from './LinkUpdater.d.ts';

/** @public @unofficial */
export interface LinkUpdaters extends Record<string, LinkUpdater> {
    canvas?: CanvasLinkUpdater;
}
