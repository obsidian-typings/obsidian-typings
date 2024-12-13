import type { App, WorkspaceLeaf } from "obsidian";
import type { BrowserView } from "../../../internals/InternalPlugins/Browser/BrowserView.js";
import { ViewType } from "../../Constants/ViewType.ts";
import { getViewConstructorByViewType } from "./getViewConstructorByViewType.ts";
import type { BrowserPluginInstance } from "../../../internals/InternalPlugins/Browser/BrowserPluginInstance.js";

/**
 * Get the BrowserView constructor.
 *
 * @returns The BrowserView constructor.
 */

export function getBrowserViewConstructor(app: App): BrowserViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Browser) as BrowserViewConstructor;
}

type BrowserViewConstructor = new (leaf: WorkspaceLeaf, browserPluginInstance: BrowserPluginInstance) => BrowserView;
