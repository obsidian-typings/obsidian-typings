import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Property widget component for text.
 *
 * @public
 * @unofficial
 */
export interface TextPropertyWidgetComponent extends PropertyWidgetComponentBase<string> {
    /** The render context for the property widget. */
    ctx: PropertyRenderContext;

    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The link element for the property widget. */
    linkEl: HTMLDivElement;

    /** The link text element for the property widget. */
    linkTextEl: HTMLDivElement;

    /** The type of the property widget. */
    type: 'text';

    /** The value of the property widget. */
    value: string;

    /**
     * Get the display text of the link from the property widget.
     *
     * @returns The display text.
     */
    getDisplayText(): string;

    /**
     * Get the link text of the property widget.
     *
     * @returns The link text.
     */
    getLinkText(): string;

    /**
     * Check if the property widget link has an alias.
     *
     * @returns Whether the property widget link has an alias.
     */
    isAlias(): boolean;

    /**
     * Check if the property widget link is a wikilink.
     *
     * @returns Whether the property widget link is a wikilink.
     */
    isWikilink(): boolean;

    /**
     * Render the property widget.
     */
    render(): void;
}
