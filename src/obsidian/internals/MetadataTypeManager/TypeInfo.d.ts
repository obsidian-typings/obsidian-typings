import type { PropertyWidget } from '../PropertyWidget.d.ts';

/** @public */
export interface TypeInfo {
    expected: PropertyWidget<unknown>;
    inferred: PropertyWidget<unknown>;
}
