import type { PropertyWidget } from '../PropertyWidget.d.ts';
import type { PropertyWidgetType } from '../PropertyWidgetType.d.ts';
import type { AliasesPropertyWidgetComponent } from './AliasesPropertyWidgetComponent.d.ts';
import type { CheckboxPropertyWidgetComponent } from './CheckboxPropertyWidgetComponent.d.ts';
import type { DatePropertyWidgetComponent } from './DatePropertyWidgetComponent.d.ts';
import type { DatetimePropertyWidgetComponent } from './DatetimePropertyWidgetComponent.d.ts';
import type { FilePropertyWidgetComponent } from './FilePropertyWidgetComponent.d.ts';
import type { FolderPropertyWidgetComponent } from './FolderPropertyWidgetComponent.d.ts';
import type { MultitextPropertyWidgetComponent } from './MultitextPropertyWidgetComponent.d.ts';
import type { NumberPropertyWidgetComponent } from './NumberPropertyWidgetComponent.d.ts';
import type { PropertyPropertyWidgetComponent } from './PropertyPropertyWidgetComponent.d.ts';
import type { TagsPropertyWidgetComponent } from './TagsPropertyWidgetComponent.d.ts';
import type { TextPropertyWidgetComponent } from './TextPropertyWidgetComponent.d.ts';

/**
 * Registered type widgets.
 *
 * @public
 * @unofficial
 */
export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{
    /** Property widget for aliases. */
    aliases: PropertyWidget<string | string[], AliasesPropertyWidgetComponent>;

    /** Property widget for checkboxes. */
    checkbox: PropertyWidget<boolean, CheckboxPropertyWidgetComponent>;

    /** Property widget for dates. */
    date: PropertyWidget<moment.MomentInput, DatePropertyWidgetComponent>;

    /** Property widget for datetimes. */
    datetime: PropertyWidget<
        moment.MomentInput,
        DatetimePropertyWidgetComponent
    >;

    /** Property widget for files. */
    file: PropertyWidget<string, FilePropertyWidgetComponent>;

    /** Property widget for folders. */
    folder: PropertyWidget<string, FolderPropertyWidgetComponent>;

    /** Property widget for multitexts. */
    multitext: PropertyWidget<string[] | string, MultitextPropertyWidgetComponent>;

    /** Property widget for numbers. */
    number: PropertyWidget<number, NumberPropertyWidgetComponent>;

    /** Property widget for properties. */
    property: PropertyWidget<string, PropertyPropertyWidgetComponent>;

    /** Property widget for tags. */
    tags: PropertyWidget<string[] | string, TagsPropertyWidgetComponent>;

    /** Property widget for text. */
    text: PropertyWidget<string, TextPropertyWidgetComponent>;
}
