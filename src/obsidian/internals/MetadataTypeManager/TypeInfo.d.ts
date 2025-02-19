import type { PropertyWidget } from '../PropertyWidget.d.ts';

/** @public */
export interface TypeInfo {
    inferred: PropertyWidget<unknown>;
    expected: PropertyWidget<unknown>;
}
