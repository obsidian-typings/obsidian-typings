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
import type { TagsPropertyWidgetComponent } from './TagsPropertyWidgetComponent.d.ts';
import type { TextPropertyWidgetComponent } from './TextPropertyWidgetComponent.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{
    /** @todo Documentation incomplete. */
    aliases: PropertyWidget<string | string[], AliasesPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    checkbox: PropertyWidget<boolean | null, CheckboxPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    date: PropertyWidget<moment.MomentInput, DatePropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    datetime: PropertyWidget<moment.MomentInput, DatetimePropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    file: PropertyWidget<string, FilePropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    folder: PropertyWidget<string, FolderPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    multitext: PropertyWidget<string[], MultitextPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    number: PropertyWidget<number, NumberPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    tags: PropertyWidget<string[], TagsPropertyWidgetComponent>;

    /** @todo Documentation incomplete. */
    text: PropertyWidget<null | string, TextPropertyWidgetComponent>;
}
