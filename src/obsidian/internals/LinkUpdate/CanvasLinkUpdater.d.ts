import type { App } from "obsidian";
import type { CanvasPluginInstance } from "../index.js";
import type { LinkUpdater } from "./index.js";
export interface CanvasLinkUpdater extends LinkUpdater {
    app: App;
    canvas: CanvasPluginInstance;
}
