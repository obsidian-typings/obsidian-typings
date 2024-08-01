import type {
    CanvasLinkUpdater,
    LinkUpdater
} from "./index.js";

export interface LinkUpdaters {
    [key: string]: LinkUpdater | undefined;
    canvas?: CanvasLinkUpdater;
}
