import type { App } from "obsidian";
import type { CanvasPluginInstance } from "../InternalPlugin/CanvasPluginInstance.js";
import type { LinkUpdater } from "./LinkUpdater.js";

export interface CanvasLinkUpdater extends LinkUpdater {
    app: App;
    canvas: CanvasPluginInstance;
}
