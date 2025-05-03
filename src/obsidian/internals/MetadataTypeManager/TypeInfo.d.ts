import type { PropertyWidget } from '../PropertyWidget.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface TypeInfo {
    /** @todo Documentation incomplete. */
    expected: PropertyWidget<unknown>;

    /** @todo Documentation incomplete. */
    inferred: PropertyWidget<unknown>;
}
