import type { PropertyWidget } from '../PropertyWidget.d.ts';

/** @public @unofficial */
export interface TypeInfo {
    expected: PropertyWidget<unknown>;
    inferred: PropertyWidget<unknown>;
}
