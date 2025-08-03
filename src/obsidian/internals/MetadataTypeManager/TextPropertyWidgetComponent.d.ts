import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface TextPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /**
     * @todo Documentation incomplete.
     */
    ctx: PropertyRenderContext;

    /**
     * @todo Documentation incomplete.
     */
    inputEl: HTMLInputElement;

    /**
     * @todo Documentation incomplete.
     */
    linkEl: HTMLDivElement;

    /**
     * @todo Documentation incomplete.
     */
    linkTextEl: HTMLDivElement;

    /**
     * @todo Documentation incomplete.
     */
    type: 'text';

    /**
     * @todo Documentation incomplete.
     */
    value: string;

    /**
     * @todo Documentation incomplete.
     */
    getDisplayText(): string;

    /**
     * @todo Documentation incomplete.
     */
    getLinkText(): string;

    /**
     * @todo Documentation incomplete.
     */
    isAlias(): boolean;

    /**
     * @todo Documentation incomplete.
     */
    isWikilink(): boolean;

    /**
     * @todo Documentation incomplete.
     */
    render(): void;

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: string | null): void;

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: string | null): void;
}
