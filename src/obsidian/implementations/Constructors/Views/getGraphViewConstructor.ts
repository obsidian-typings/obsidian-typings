import type { App } from "obsidian";
import type { GraphView } from "../../../internals/InternalPlugins/Graph/GraphView.js";
import { ViewType } from "../../Constants/ViewType.ts";
import { getViewConstructorByViewType } from "./getViewConstructorByViewType.ts";
import type { TypedViewConstructor } from "./TypedViewConstructor.ts";

/**
 * Get the GraphView constructor.
 *
 * @returns The GraphView constructor.
 */

export function getGraphViewConstructor(app: App): TypedViewConstructor<GraphView> {
    return getViewConstructorByViewType(app, ViewType.Graph) as TypedViewConstructor<GraphView>;
}
