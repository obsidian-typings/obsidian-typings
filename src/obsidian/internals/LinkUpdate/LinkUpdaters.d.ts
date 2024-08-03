import type {
    CanvasLinkUpdater,
    LinkUpdater
} from "./index.js";

export interface LinkUpdaters extends Record<string, LinkUpdater> {
    canvas?: CanvasLinkUpdater;
}
