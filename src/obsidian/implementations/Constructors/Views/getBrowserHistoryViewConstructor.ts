import type { App, WorkspaceLeaf } from "obsidian";
import type { BrowserHistoryView } from "../../../internals/InternalPlugins/Browser/BrowserHistoryView.js";
import { ViewType } from "../../Constants/ViewType.ts";
import { getViewConstructorByViewType } from "./getViewConstructorByViewType.ts";
import type { BrowserPluginInstance } from "../../../internals/InternalPlugins/Browser/BrowserPluginInstance.js";

/**
 * Get the BrowserHistoryView constructor.
 *
 * @returns The BrowserHistoryView constructor.
 */

export function getBrowserHistoryViewConstructor(app: App): BrowserHistoryViewConstructor {
    return getViewConstructorByViewType(app, ViewType.BrowserHistory) as BrowserHistoryViewConstructor;
}

type BrowserHistoryViewConstructor = new (leaf: WorkspaceLeaf, browserPluginInstance: BrowserPluginInstance) => BrowserHistoryView;
