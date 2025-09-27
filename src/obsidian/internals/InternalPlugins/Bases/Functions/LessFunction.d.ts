import type { BasesFunction } from '../BasesFunction.d.ts';
import type { HasCompare } from '../HasCompare.d.ts';
import type { HasGetDisplayName } from '../HasGetDisplayName.d.ts';
import type { HasGetRHSWidgetType } from '../HasGetRHSWidgetType.d.ts';

/**
 * Function `Less`.
 * @public
 * @unofficial
 */
export interface LessFunction extends BasesFunction, HasGetDisplayName, HasCompare, HasGetRHSWidgetType {
}
