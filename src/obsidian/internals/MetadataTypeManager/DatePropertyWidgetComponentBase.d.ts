import type moment from 'moment';
import type { HoverPopover } from 'obsidian';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * Base interface for date property widget components.
 *
 * @public
 * @unofficial
 */
export interface DatePropertyWidgetComponentBase extends PropertyWidgetComponentBase<moment.MomentInput> {
    /** The date of the property widget. */
    date?: moment.Moment;

    /** Whether the property widget is dirty. */
    dirty: boolean;

    /** The hover popup for the property widget. */
    hoverPopup: HoverPopover | null;

    /** The input element for the property widget. */
    inputEl: HTMLInputElement;

    /** The value of the property widget. */
    value: string;

    /**
     * Build the input element for the property widget.
     *
     * @param parentEl - The parent element.
     * @returns The input element.
     */
    buildInput(parentEl: HTMLElement): HTMLInputElement;

    /**
     * Format the date input.
     *
     * @param input - The input to format.
     * @returns The formatted date.
     */
    format(input: moment.Moment): string;

    /**
     * Parse the date input.
     *
     * @param input - The input to parse.
     * @returns The parsed date.
     */
    parse(input: moment.MomentInput): void;
}
