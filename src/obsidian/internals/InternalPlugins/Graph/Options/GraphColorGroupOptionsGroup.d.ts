import type {
    ColorComponent,
    TextComponent
} from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface GraphColorGroupOptionsGroup {
    color: ColorComponent;
    el: HTMLDivElement;
    query: TextComponent;
}
