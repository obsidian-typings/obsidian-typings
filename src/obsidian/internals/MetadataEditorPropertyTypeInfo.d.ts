import type { PropertyWidget } from './PropertyWidget.d.ts';

/** @public @unofficial */
export interface MetadataEditorPropertyTypeInfo {
    expected: PropertyWidget<unknown>;
    inferred: PropertyWidget<unknown>;
}
