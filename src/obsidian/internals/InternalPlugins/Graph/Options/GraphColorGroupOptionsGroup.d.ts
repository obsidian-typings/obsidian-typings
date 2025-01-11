import type { ColorComponent, TextComponent } from "obsidian";

/** @public */
export interface GraphColorGroupOptionsGroup {
    color: ColorComponent;
    el: HTMLDivElement;
    query: TextComponent;
}
