import type {
    ColorComponent,
    TextComponent
} from 'obsidian';

/**
 * UI components for a single color group entry in the graph settings panel.
 * @public
 * @unofficial
 */
export interface GraphColorGroupOptionsGroup {
    /** Color picker component for selecting the group color. */
    color: ColorComponent;

    /** Container element for this color group entry. */
    el: HTMLDivElement;

    /** Text input component for the search query that defines this group. */
    query: TextComponent;
}
