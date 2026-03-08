import type { BasesFunction } from '../BasesFunction.d.ts';
import type { HasGetDisplayName } from '../HasGetDisplayName.d.ts';
import type { HasGetRHSWidgetType } from '../HasGetRHSWidgetType.d.ts';

/**
 * Function `TaggedWith`.
 * @public
 * @unofficial
 */
export interface TaggedWithFunction extends BasesFunction, HasGetDisplayName, HasGetRHSWidgetType {
}
