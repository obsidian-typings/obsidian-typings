import type { BasesFunction } from '../BasesFunction.d.ts';
import type { HasCompare } from '../HasCompare.d.ts';
import type { HasGetDisplayName } from '../HasGetDisplayName.d.ts';
import type { HasGetRHSWidgetType } from '../HasGetRHSWidgetType.d.ts';

/**
 * Function `GreaterOrEqual`.
 * @public
 * @unofficial
 */
export interface GreaterOrEqualFunction extends BasesFunction, HasGetDisplayName, HasCompare, HasGetRHSWidgetType {
}
