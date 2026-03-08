import type { BasesFunction } from '../BasesFunction.d.ts';
import type { HasGetDisplayName } from '../HasGetDisplayName.d.ts';
import type { HasGetRHSWidgetType } from '../HasGetRHSWidgetType.d.ts';

/**
 * Function `Empty`.
 * @public
 * @unofficial
 */
export interface EmptyFunction extends BasesFunction, HasGetDisplayName, HasGetRHSWidgetType {
}
