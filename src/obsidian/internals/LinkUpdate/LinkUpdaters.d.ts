import type { CanvasLinkUpdater } from "./CanvasLinkUpdater.js";
import type { LinkUpdater } from "./LinkUpdater.js";

export interface LinkUpdaters extends Record<string, LinkUpdater> {
    canvas?: CanvasLinkUpdater;
}
