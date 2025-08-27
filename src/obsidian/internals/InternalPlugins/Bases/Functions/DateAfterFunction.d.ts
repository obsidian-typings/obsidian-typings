import type { BasesFunction } from '../BasesFunction.d.ts';
import type { HasCompare } from '../HasCompare.d.ts';
import type { HasGetDisplayName } from '../HasGetDisplayName.d.ts';
import type { HasGetRHSWidgetType } from '../HasGetRHSWidgetType.d.ts';

/**
 * Function `DateAfter`.
 * @public
 * @unofficial
 */
export interface DateAfterFunction extends BasesFunction, HasGetDisplayName, HasCompare, HasGetRHSWidgetType {
}
