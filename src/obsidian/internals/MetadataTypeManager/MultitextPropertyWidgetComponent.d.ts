import type { HoverPopover } from 'obsidian';
import type { Multiselect } from './Multiselect.d.ts';
import type { PropertyWidgetComponentBase } from './PropertyWidgetComponentBase.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface MultitextPropertyWidgetComponent extends PropertyWidgetComponentBase {
    /**
     * @todo Documentation incomplete.
     */
    hoverPopover: HoverPopover | null;

    /**
     * @todo Documentation incomplete.
     */
    multiselect: Multiselect;

    /**
     * @todo Documentation incomplete.
     */
    type: 'multitext';

    /**
     * @todo Documentation incomplete.
     */
    valueSet: Set<string>;

    /**
     * @todo Documentation incomplete.
     */
    setValue(value: string[] | string): void;
}
