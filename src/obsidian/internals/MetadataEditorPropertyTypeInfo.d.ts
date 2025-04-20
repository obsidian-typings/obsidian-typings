import type { PropertyWidget } from './PropertyWidget.d.ts';

/**
 * @public
 * @unofficial
 */
export interface MetadataEditorPropertyTypeInfo {
    /**
     * @todo Documentation incomplete.
     */
    expected: PropertyWidget<unknown>;

    /**
     * @todo Documentation incomplete.
     */
    inferred: PropertyWidget<unknown>;
}
