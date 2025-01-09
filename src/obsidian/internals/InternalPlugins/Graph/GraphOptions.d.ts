import type { ColorComponent, SearchComponent, Setting, TextComponent } from "obsidian";
import type { TreeItem } from "../../TreeItem.js";


export interface GraphOptions extends TreeItem<unknown> {
    /** @internal */
    getOptions(e: unknown): unknown;
    /** @internal */
    setOptions(e: unknown): unknown;
}

export interface GraphColorGroupOptions extends GraphOptions {
    groups: {
        color: ColorComponent,
        el: HTMLDivElement,
        query: TextComponent,
    }[];
}

export interface GraphDisplayOptions extends GraphOptions {

}

export interface GraphFilterOptions extends GraphOptions {
    search: SearchComponent;
    searchSetting: Setting;
}

export interface GraphForceOptions extends GraphOptions {

}