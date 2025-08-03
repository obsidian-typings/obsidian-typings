import type { Component } from 'obsidian';
import type { FocusMode } from '../FocusMode.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface PropertyWidgetComponentBase extends Component {
    /**
     * @todo Documentation incomplete.
     */
    containerEl: HTMLElement;

    /**
     * @todo Documentation incomplete.
     */
    type: string;

    /**
     * @todo Documentation incomplete.
     */
    focus(mode?: FocusMode): void;

    /**
     * @todo Documentation incomplete.
     */
    onFocus(mode: FocusMode): void;
}
