import type { FocusMode } from '../FocusMode.d.ts';

/**
 * Base class for property widget components.
 *
 * @public
 * @unofficial
 */
export interface PropertyWidgetComponentBase {
    /**
     * Focus the property widget.
     *
     * @param mode - The focus mode.
     */
    focus(mode?: FocusMode): void;

    /** The type of the property widget. */
    type: string;
}
