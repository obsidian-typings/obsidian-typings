import type { FocusMode } from '../FocusMode.d.ts';

/**
 * Base class for property widget components.
 *
 * @public
 * @unofficial
 */
export interface PropertyWidgetComponentBase {
    /** The type of the property widget. */
    type: string;

    /**
     * Focus the property widget.
     *
     * @param mode - The focus mode.
     */
    focus(mode?: FocusMode): void;
}
