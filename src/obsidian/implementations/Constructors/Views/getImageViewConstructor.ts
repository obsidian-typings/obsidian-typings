import type { App } from "obsidian";
import type { ImageView } from "../../../internals/Views/ImageView.js";
import { ViewType } from "../../Constants/ViewType.ts";
import { getViewConstructorByViewType } from "./getViewConstructorByViewType.ts";
import type { TypedViewConstructor } from "./TypedViewConstructor.ts";

/**
 * Get the ImageView constructor.
 *
 * @returns The ImageView constructor.
 */

export function getImageViewConstructor(app: App): TypedViewConstructor<ImageView> {
    return getViewConstructorByViewType(app, ViewType.Image) as TypedViewConstructor<ImageView>;
}
