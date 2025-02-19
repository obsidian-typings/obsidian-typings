import type { PropertyWidget } from './PropertyWidget.d.ts';

/** @public */
export interface MetadataEditorPropertyTypeInfo {
    expected: PropertyWidget<unknown>;
    inferred: PropertyWidget<unknown>;
}
